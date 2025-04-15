@extends('layouts.app')

@section('content')
<div class="container my-5">
    <div class="row text-center g-4">
        <!-- Total Users -->
        <div class="col-md-4">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <h6 class="text-muted">Total Users</h6>
                    <h2 class="text-primary fw-bold">{{ $userCount }}</h2>
                    <small class="text-secondary">Registered users</small>
                </div>
            </div>
        </div>

        <!-- Total Categories -->
        <div class="col-md-4">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <h6 class="text-muted">Total Categories</h6>
                    <h2 class="text-success fw-bold">{{ $categoryCount }}</h2>
                    <small class="text-secondary">Available categories</small>
                </div>
            </div>
        </div>

        <!-- Total Transactions -->
        <div class="col-md-4">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <h6 class="text-muted">Total Transactions</h6>
                    <h2 class="text-warning fw-bold">{{ $transactionCount }}</h2>
                    <small class="text-secondary">Recorded transactions</small>
                </div>
            </div>
        </div>
    </div>

    <!-- Bar Graph Section -->
    <div class="row mt-5">
        <div class="col-md-12">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <h5 class="mb-4 text-center text-info fw-semibold">Data Overview</h5>
                    <canvas id="dataBarGraph" style="height: 300px;"></canvas>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    const ctxBar = document.getElementById('dataBarGraph').getContext('2d');
    new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['Users', 'Categories', 'Transactions'],
            datasets: [{
                label: 'Count',
                data: [{{ $userCount }}, {{ $categoryCount }}, {{ $transactionCount }}],
                backgroundColor: ['#0d6efd', '#198754', '#ffc107'],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}`;
                        }
                    }
                }
            }
        }
    });
</script>
@endsection
