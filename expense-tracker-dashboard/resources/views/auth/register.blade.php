@extends('layouts.app')

@section('content')
<div class="container-fluid d-flex align-items-center justify-content-center" style="min-height: 100vh; background: linear-gradient(45deg, #FF6F61, #6F42C1);">
    <div class="col-md-6">
        <!-- Project Title -->
        <div class="text-center mb-4">
            <h3 class="text-white mt-3" style="font-family: 'Comic Sans MS', cursive;">{{ __('Expense Tracker Dashboard') }}</h3>
        </div>

        <div class="card shadow-lg border-0 rounded-lg" style="background: rgba(255, 255, 255, 0.8);">
            <div class="card-header text-center bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg">
                <h4 class="mb-0" style="font-family: 'Comic Sans MS', cursive; color: black;">{{ __('Register') }}</h4>
            </div>

            <div class="card-body">
                <form method="POST" action="{{ route('register') }}">
                    @csrf

                    <!-- Name -->
                    <div class="mb-3">
                        <label for="name" class="form-label">{{ __('Name') }}</label>
                        <input id="name" type="text"
                               class="form-control @error('name') is-invalid @enderror"
                               name="name" value="{{ old('name') }}" required autofocus
                               style="border-radius: 30px;">

                        @error('name')
                        <div class="invalid-feedback">
                            {{ $message }}
                        </div>
                        @enderror
                    </div>

                    <!-- Email -->
                    <div class="mb-3">
                        <label for="email" class="form-label">{{ __('Email Address') }}</label>
                        <input id="email" type="email"
                               class="form-control @error('email') is-invalid @enderror"
                               name="email" value="{{ old('email') }}" required
                               style="border-radius: 30px;">

                        @error('email')
                        <div class="invalid-feedback">
                            {{ $message }}
                        </div>
                        @enderror
                    </div>

                    <!-- Password -->
                    <div class="mb-3">
                        <label for="password" class="form-label">{{ __('Password') }}</label>
                        <input id="password" type="password"
                               class="form-control @error('password') is-invalid @enderror"
                               name="password" required
                               style="border-radius: 30px;">

                        @error('password')
                        <div class="invalid-feedback">
                            {{ $message }}
                        </div>
                        @enderror
                    </div>

                    <!-- Confirm Password -->
                    <div class="mb-3">
                        <label for="password-confirm" class="form-label">{{ __('Confirm Password') }}</label>
                        <input id="password-confirm" type="password"
                               class="form-control"
                               name="password_confirmation" required
                               style="border-radius: 30px;">
                    </div>

                    <!-- Buttons -->
                    <div class="d-grid gap-2">
                        <button type="submit" class="btn btn-lg btn-danger" style="border-radius: 50px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);">
                            {{ __('Register') }}
                        </button>

                        @if (Route::has('login'))
                            <a class="btn btn-link text-center text-dark" href="{{ route('login') }}" style="font-weight: bold; text-decoration: underline;">
                                {{ __('Already have an account? Login') }}
                            </a>
                        @endif
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
