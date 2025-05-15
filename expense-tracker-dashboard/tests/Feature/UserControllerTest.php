<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
    }

    public function test_index_displays_users()
    {
        $user1 = User::create(['name' => 'User One', 'email' => 'user1@example.com', 'password' => 'password']);
        $user2 = User::create(['name' => 'User Two', 'email' => 'user2@example.com', 'password' => 'password']);

        $response = $this->actingAs($this->user)
                         ->get(route('users.index'));

        $response->assertStatus(200);
        $response->assertViewIs('users.index');
        $response->assertViewHas('users');
        $response->assertSee($user1->name);
        $response->assertSee($user2->name);
    }

    public function test_edit_displays_form()
    {
        $user = User::create(['name' => 'Test User', 'email' => 'test@example.com', 'password' => 'password']);

        $response = $this->actingAs($this->user)
                         ->get(route('users.edit', $user));

        $response->assertStatus(200);
        $response->assertViewIs('users.edit');
        $response->assertViewHas('user');
    }

    public function test_update_changes_user_details()
    {
        $user = User::create(['name' => 'Old Name', 'email' => 'old@example.com', 'password' => 'password']);

        $response = $this->actingAs($this->user)
                         ->put(route('users.update', $user), [
                             'name' => 'New Name',
                             'email' => 'new@example.com',
                             'password' => 'newpassword', 
                         ]);

        $response->assertRedirect(route('users.index'));
        $this->assertDatabaseHas('users', ['id' => $user->id, 'name' => 'New Name', 'email' => 'new@example.com']);
        $response->assertSessionHas('success');
    }

    public function test_destroy_deletes_user()
    {
        $user = User::create(['name' => 'Test User', 'email' => 'test@example.com', 'password' => 'password']);

        $response = $this->actingAs($this->user)
                         ->delete(route('users.destroy', $user));

        $response->assertRedirect(route('users.index'));
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
        $response->assertSessionHas('success');
    }
}

