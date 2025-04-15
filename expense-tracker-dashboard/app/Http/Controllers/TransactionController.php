<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::with('category')->latest()->paginate(10);
        return view('transactions.index', compact('transactions'));
    }

    public function edit(Transaction $transaction)
    {
        $categories = Category::all();
        $user = User::findOrFail($transaction->user_id); 
        return view('transactions.edit', compact('transaction', 'categories','user'));
    }

    public function update(Request $request, Transaction $transaction, $user_id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'type' => 'required|in:income,expense',
            'category_id' => 'required|exists:categories,id',
            'date' => 'required|date',
        ]);

        $user = User::findOrFail($user_id);

        $transaction->user_id = $user->id; 
        $transaction->update($request->all());

        return redirect()->route('transactions.index')->with('success', 'Transaction updated successfully.');
    }

    public function destroy(Transaction $transaction)
    {
        $transaction->delete();
        return redirect()->route('transactions.index')->with('success', 'Transaction deleted successfully.');
    }
}
