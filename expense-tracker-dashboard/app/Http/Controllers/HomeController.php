<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Category;
use App\Models\Transaction;
use Carbon\Carbon;         

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        // Count data
        $userCount = User::count();
        $categoryCount = Category::count();
        $transactionCount = Transaction::count();
        $latestUsers = User::latest()->take(5)->get();
        $latestTransactions = Transaction::latest()->take(5)->get();
        $categoryTransactionCounts = Category::withCount('transactions')->get();

        return view('dashboard', compact(
            'userCount', 
            'categoryCount', 
            'transactionCount', 
            'latestUsers',
            'latestTransactions',
            'categoryTransactionCounts'
        ));
    }
}
