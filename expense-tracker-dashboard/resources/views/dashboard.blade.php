@extends('layouts.app')

@section('content')
    <div class="container my-5">
        <div class="row text-center g-4">
            <!-- Total Users -->
            <div class="col-md-4">
                <div class="card border-0 shadow h-100 rounded-4 position-relative overflow-hidden"
                    style="background: linear-gradient(135deg, #e0f0ff, #ffffff); transition: all 0.3s ease;">

                    <span class="position-absolute top-0 end-0 m-2 badge bg-primary-subtle text-primary fw-semibold">
                        <i class="bi bi-people-fill me-1"></i> Users
                    </span>

                    <div class="card-body mt-4">
                        <div class="d-flex justify-content-center mb-3">
                            <div class="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center"
                                style="width: 60px; height: 60px;">
                                <i class="bi bi-people-fill" style="font-size: 1.75rem;"></i>
                            </div>
                        </div>
                        <h6 class="text-muted">Total Users</h6>
                        <h2 class="text-primary fw-bold">{{ $userCount }}</h2>
                    </div>
                </div>
            </div>

            <!-- Total Categories -->
            <div class="col-md-4">
                <div class="card border-0 shadow h-100 rounded-4 position-relative overflow-hidden"
                    style="background: linear-gradient(135deg, #e6ffee, #ffffff); transition: all 0.3s ease;">

                    <span class="position-absolute top-0 end-0 m-2 badge bg-success-subtle text-success fw-semibold">
                        <i class="bi bi-tags-fill me-1"></i> Categories
                    </span>

                    <div class="card-body mt-4">
                        <div class="d-flex justify-content-center mb-3">
                            <div class="bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center"
                                style="width: 60px; height: 60px;">
                                <i class="bi bi-tags-fill" style="font-size: 1.75rem;"></i>
                            </div>
                        </div>
                        <h6 class="text-muted">Total Categories</h6>
                        <h2 class="text-success fw-bold">{{ $categoryCount }}</h2>
                    </div>
                </div>
            </div>

            <!-- Total Transactions -->
            <div class="col-md-4">
                <div class="card border-0 shadow h-100 rounded-4 position-relative overflow-hidden"
                    style="background: linear-gradient(135deg, #fff8e6, #ffffff); transition: all 0.3s ease;">

                    <span class="position-absolute top-0 end-0 m-2 badge bg-warning-subtle text-warning fw-semibold">
                        <i class="bi bi-cash-coin me-1"></i> Transactions
                    </span>

                    <div class="card-body mt-4">
                        <div class="d-flex justify-content-center mb-3">
                            <div class="bg-warning bg-opacity-10 text-warning rounded-circle d-flex align-items-center justify-content-center"
                                style="width: 60px; height: 60px;">
                                <i class="bi bi-cash-coin" style="font-size: 1.75rem;"></i>
                            </div>
                        </div>
                        <h6 class="text-muted">Total Transactions</h6>
                        <h2 class="text-warning fw-bold">{{ $transactionCount }}</h2>
                    </div>
                </div>
            </div>
        </div>

        <!-- Latest Registered Users -->
        <div class="row mt-5">
            <div class="col-md-12">
                <div class="card border-0 shadow-lg rounded-4">
                    <div class="card-body">
                        <h5 class="mb-4 text-center text-primary fw-semibold">
                            <i class="bi bi-person-lines-fill me-2"></i> Latest Registered Users
                        </h5>
                        @if($latestUsers->isEmpty())
                            <p class="text-muted text-center">No recent users.</p>
                        @else
                            <div class="table-responsive">
                                <table class="table table-hover table-striped align-middle">
                                    <thead class="table-light">
                                        <tr>
                                            <th><i class="bi bi-person-circle"></i> Name</th>
                                            <th><i class="bi bi-envelope-fill"></i> Email</th>
                                            <th><i class="bi bi-calendar-fill"></i> Registered At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach($latestUsers as $user)
                                            <tr>
                                                <td>{{ $user->name }}</td>
                                                <td>{{ $user->email }}</td>
                                                <td>
                                                    <span class="badge rounded-pill bg-info text-dark">
                                                        {{ $user->created_at->format('d M Y, h:i A') }}
                                                    </span>
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Transactions -->
        <div class="row mt-5">
            <div class="col-md-12">
                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <h5 class="mb-4 text-center text-warning fw-semibold">
                            <i class="bi bi-cash-stack me-2"></i> Latest Transactions
                        </h5>
                        @if($latestTransactions->isEmpty())
                            <p class="text-muted text-center">No recent transactions.</p>
                        @else
                            <div class="table-responsive">
                                <table class="table table-hover table-striped align-middle">
                                    <thead class="table-light">
                                        <tr>
                                            <th><i class="bi bi-file-earmark-arrow-up"></i> Transaction ID</th>
                                            <th><i class="bi bi-person-circle"></i> User</th>
                                            <th><i class="bi bi-cash-stack"></i> Amount</th>
                                            <th><i class="bi bi-tag"></i> Type</th>
                                            <th><i class="bi bi-calendar-check"></i> Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach($latestTransactions as $transaction)
                                            <tr>
                                                <td>{{ $transaction->id }}</td>
                                                <td>{{ $transaction->user->name }}</td>
                                                <td>
                                                    <span class="badge rounded-pill 
                                                                @if($transaction->amount > 0)
                                                                    bg-success text-white
                                                                @else
                                                                    bg-danger text-white
                                                                @endif">
                                                        ${{ number_format($transaction->amount, 2) }}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span class="badge 
                                                                @if($transaction->type == 'income')
                                                                    bg-success text-white
                                                                @elseif($transaction->type == 'expense')
                                                                    bg-danger text-white
                                                                @else
                                                                    bg-secondary text-white
                                                                @endif">
                                                        {{ ucfirst($transaction->type) }}
                                                    </span>
                                                </td>
                                                <td>{{ $transaction->created_at->format('d M Y, h:i A') }}</td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>


        <!-- Transactions by Category (Bar Graph) -->
        <div class="row mt-5">
            <div class="col-md-12">
                <div class="card border-0 shadow-sm">
                    <div class="card-body">
                        <h5 class="mb-4 text-center text-info fw-semibold">Transactions by Category</h5>
                        <canvas id="transactionsByCategory" style="height: 300px;"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        const ctx = document.getElementById('transactionsByCategory').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [
                    @foreach($categoryTransactionCounts as $category)
                        '{{ $category->name }}',
                    @endforeach
                            ],
                datasets: [{
                    label: 'Transactions Count',
                    data: [
                        @foreach($categoryTransactionCounts as $category)
                            {{ $category->transactions_count }},
                        @endforeach
                                ],
                    backgroundColor: '#198754',
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
                            label: function (context) {
                                return `${context.label}: ${context.raw}`;
                            }
                        }
                    }
                }
            }
        });
    </script>
@endsection