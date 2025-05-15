<?php
namespace Tests\Feature;

use App\Models\Category;
use App\Models\User;
use App\Models\Transaction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TransactionControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->user = User::factory()->create();
    }

    public function test_index_displays_transactions()
    {
        $category = Category::create(['name' => 'Test Category']);
        $transaction1 = Transaction::create([
            'title' => 'Test Transaction 1',
            'amount' => 100,
            'type' => 'income',
            'category_id' => $category->id,
            'user_id' => $this->user->id,
            'date' => now()->toDateString(),
        ]);
        $transaction2 = Transaction::create([
            'title' => 'Test Transaction 2',
            'amount' => 200,
            'type' => 'expense',
            'category_id' => $category->id,
            'user_id' => $this->user->id,
            'date' => now()->toDateString(),
        ]);

        $response = $this->actingAs($this->user)
                         ->get(route('transactions.index'));

        $response->assertStatus(200);
        $response->assertViewIs('transactions.index');
        $response->assertViewHas('transactions');
        $response->assertSee($transaction1->title);
        $response->assertSee($transaction2->title);
    }

    public function test_edit_displays_form()
    {
        $category = Category::create(['name' => 'Test Category']);
        $transaction = Transaction::create([
            'title' => 'Test Transaction',
            'amount' => 100,
            'type' => 'income',
            'category_id' => $category->id,
            'user_id' => $this->user->id,
            'date' => now()->toDateString(),
        ]);

        $response = $this->actingAs($this->user)
                         ->get(route('transactions.edit', $transaction));

        $response->assertStatus(200);
        $response->assertViewIs('transactions.edit');
        $response->assertViewHas('transaction');
        $response->assertViewHas('categories');
    }

    public function test_update_changes_transaction()
    {
        $category = Category::create(['name' => 'Test Category']);
        $transaction = Transaction::create([
            'title' => 'Old Transaction',
            'amount' => 100,
            'type' => 'income',
            'category_id' => $category->id,
            'user_id' => $this->user->id,
            'date' => now()->toDateString(),
        ]);

        $response = $this->actingAs($this->user)
                         ->put(route('transactions.update', [$transaction, $this->user->id]), [
                             'title' => 'Updated Transaction',
                             'amount' => 150,
                             'type' => 'expense',
                             'category_id' => $category->id,
                             'date' => now()->toDateString(),
                         ]);

        $response->assertRedirect(route('transactions.index'));
        $this->assertDatabaseHas('transactions', ['id' => $transaction->id, 'title' => 'Updated Transaction']);
        $response->assertSessionHas('success');
    }

    public function test_destroy_deletes_transaction()
    {
        $category = Category::create(['name' => 'Test Category']);
        $transaction = Transaction::create([
            'title' => 'Test Transaction',
            'amount' => 100,
            'type' => 'income',
            'category_id' => $category->id,
            'user_id' => $this->user->id,
            'date' => now()->toDateString(),
        ]);

        $response = $this->actingAs($this->user)
                         ->delete(route('transactions.destroy', $transaction));

        $response->assertRedirect(route('transactions.index'));
        $this->assertDatabaseMissing('transactions', ['id' => $transaction->id]);
        $response->assertSessionHas('success');
    }
}
