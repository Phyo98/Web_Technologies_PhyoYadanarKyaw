@extends('layouts.app')

@section('content')
<!-- Include Font Awesome (if not already included globally) -->
@push('styles')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" integrity="sha512-nkuO8H1KH6Oo+mEcNzEXcKUVpvzO1s8F2XZl7QyFJr2yL5MSz7IvE9dzvbdo0Fzjz4J2gDbD3gL1vHkGkAe9xA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
@endpush

<div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="mb-0">Edit Category</h2>
        <a href="{{ route('categories.index') }}" class="btn btn-outline-secondary">
            <i class="fas fa-arrow-left"></i> Back to List
        </a>
    </div>

    @if($errors->any())
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <ul class="mb-0">
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    @endif

    <div class="card shadow-sm">
        <div class="card-body">
            <form action="{{ route('categories.update', $category) }}" method="POST">
                @csrf
                @method('PUT')

                <div class="mb-3">
                    <label for="name" class="form-label">Category Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        class="form-control" 
                        value="{{ old('name', $category->name) }}" 
                        required
                    >
                </div>

                <div class="d-flex justify-content-end gap-2">
                    <button type="submit" class="btn btn-success mx-2">
                        <i class="fas fa-save"></i> Update
                    </button>
                    <a href="{{ route('categories.index') }}" class="btn btn-secondary">
                        Cancel
                    </a>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
