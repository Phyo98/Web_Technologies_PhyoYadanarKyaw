<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;

Route::get('/', function () {
    return redirect()->route('login');
});

Auth::routes();

// Authenticated routes
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\HomeController::class, 'index'])->name('dashboard');

    Route::resource('transactions', TransactionController::class)->middleware('auth');
    Route::resource('categories', CategoryController::class)->middleware('auth');
    Route::resource('users', UserController::class)->middleware('auth');
    Route::resource('admins', AdminController::class)->middleware('auth');;

});
