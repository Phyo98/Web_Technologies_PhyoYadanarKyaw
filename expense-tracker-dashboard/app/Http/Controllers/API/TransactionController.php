<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->input('user_id', $request->user()->id);
        $transactions = Transaction::where('user_id', $userId)
            ->with('category') 
            ->orderBy('date', 'desc')
            ->get();

        return response()->json([
            'transactions' => $transactions,
        ]);
    }

    public function expensesByCategory(Request $request)
    {
        $userId = $request->input('user_id', $request->user()->id);
        $year = $request->input('year', date('Y')); 

        // Only allow current year or last year
        $currentYear = date('Y');
        $lastYear = $currentYear - 1;

        if ($year != $currentYear && $year != $lastYear) {
            return response()->json(['error' => 'Invalid year. Only current year and last year are allowed.'], 400);
        }

        // Start of date range for the selected year (January 1st)
        $startDate = Carbon::createFromFormat('Y-m-d', "$year-01-01")->startOfDay();
        // End of date range for the selected year (December 31st)
        $endDate = Carbon::createFromFormat('Y-m-d', "$year-12-31")->endOfDay();

        $expenses = Transaction::selectRaw('category_id, SUM(amount) as total')
            ->where('user_id', $userId)
            ->whereBetween('date', [$startDate, $endDate]) 
            ->groupBy('category_id')
            ->with('category:id,name')
            ->get()
            ->map(function ($item) {
                return [
                    'category' => $item->category->name,
                    'total' => $item->total,
                ];
            });

        return response()->json($expenses);
    }


    public function counts(Request $request)
    {
        $userId = $request->input('user_id', $request->user()->id);

        $counts = Transaction::where('user_id', $userId)
                            ->selectRaw('category_id, count(*) as count')
                            ->groupBy('category_id')
                            ->get();

        $categoryCounts = [];
        foreach ($counts as $count) {
            $category = $count->category; 
            $categoryCounts[$category->name] = $count->count;
        }

        return response()->json([
            'success' => true,
            'data' => $categoryCounts,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'type' => 'required|in:income,expense',
            'category_id' => 'required|exists:categories,id',
            'date' => 'required|date',
        ]);

        $transaction = Transaction::create([
            'user_id' => $request->user()->id, 
            'title' => $request->title,
            'amount' => $request->amount,
            'type' => $request->type,
            'category_id' => $request->category_id,
            'date' => $request->date,
        ]);

        return response()->json([
            'message' => 'Transaction created successfully!',
            'transaction' => $transaction
        ], 201);
    }

}
