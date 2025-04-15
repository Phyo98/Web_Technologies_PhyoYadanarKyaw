<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $transactions = Transaction::where('user_id', $request->user()->id)
            ->with('category') 
            ->orderBy('date', 'desc')
            ->get();

        return response()->json([
            'transactions' => $transactions,
        ]);
    }

    public function counts()
    {
        $user = Auth::user();

        $counts = Transaction::where('user_id', $user->id)
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
