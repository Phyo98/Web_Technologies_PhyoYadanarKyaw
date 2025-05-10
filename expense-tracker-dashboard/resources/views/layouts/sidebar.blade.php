<aside class="main-sidebar sidebar-light-primary elevation-4" style="min-height: 100vh; background-color: #1d2b64; color: #fff;">
  <!-- Brand Logo -->
  <a href="{{ route('dashboard') }}" class="brand-link" style="color: #fff;">
    <i class="fas fa-wallet ml-3 mr-2" style="color: #fff;"></i>
    <span class="brand-text font-weight-light">Expense Tracker</span>
  </a>

  <!-- Sidebar -->
  <div class="sidebar">
    <!-- User Panel -->
    @auth
    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
      <div class="image">
        <img src="{{ asset('images/avatar.gif') }}" class="img-circle elevation-2" alt="User Image">
      </div>
      <div class="info">
        <a href="{{ route('dashboard') }}" class="d-block" style="color: #fff;">{{ Auth::user()->name }}</a>
      </div>
    </div>
    @endauth

    <!-- Sidebar Menu -->
    <nav class="mt-2">
      <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
        <li class="nav-item">
          <a href="{{ route('dashboard') }}" class="nav-link {{ request()->is('dashboard') ? 'active' : '' }}" style="color: #fff;">
            <i class="nav-icon fas fa-tachometer-alt" style="color: #fff;"></i>
            <p>Dashboard</p>
          </a>
        </li>
        <li class="nav-item">
          <a href="{{ route('categories.index') }}" class="nav-link {{ request()->is('categories*') ? 'active' : '' }}" style="color: #fff;">
            <i class="nav-icon fas fa-tags" style="color: #fff;"></i>
            <p>Categories</p>
          </a>
        </li>
        <li class="nav-item">
          <a href="{{ route('transactions.index') }}" class="nav-link {{ request()->is('transactions*') ? 'active' : '' }}" style="color: #fff;">
            <i class="nav-icon fas fa-exchange-alt" style="color: #fff;"></i>
            <p>Transactions</p>
          </a>
        </li>
        <li class="nav-item">
          <a href="{{ route('users.index') }}" class="nav-link {{ request()->is('users*') ? 'active' : '' }}" style="color: #fff;">
            <i class="nav-icon fas fa-users" style="color: #fff;"></i>
            <p>Users</p>
          </a>
        </li>
        <li class="nav-item">
          <a href="{{ route('admins.index') }}" class="nav-link {{ request()->is('admins*') ? 'active' : '' }}" style="color: #fff;">
            <i class="nav-icon fas fa-user-shield" style="color: #fff;"></i>
            <p>Admins</p>
          </a>
        </li>
      </ul>
    </nav>
    <!-- /.sidebar-menu -->
  </div>
  <!-- /.sidebar -->
</aside>
