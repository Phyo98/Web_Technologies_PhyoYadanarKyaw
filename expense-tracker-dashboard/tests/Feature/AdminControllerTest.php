<?php

namespace Tests\Feature;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
    }

    /** @test */
    public function test_index_displays_admins()
    {
        $admin1 = Admin::create([
            'name' => 'Admin One',
            'email' => 'admin1@example.com',
            'password' => 'password',
        ]);
        $admin2 = Admin::create([
            'name' => 'Admin Two',
            'email' => 'admin2@example.com',
            'password' => 'password',
        ]);

        $response = $this->actingAs($this->user)
                         ->get(route('admins.index'));

        $response->assertStatus(200);
        $response->assertViewIs('admins.index');
        $response->assertViewHas('admins');
        $response->assertSee($admin1->name);
        $response->assertSee($admin2->name);
    }

    public function test_create_displays_form()
    {
        $response = $this->actingAs($this->user)
                         ->get(route('admins.create'));

        $response->assertStatus(200);
        $response->assertViewIs('admins.create');
    }

    public function test_store_creates_new_admin()
    {
        $response = $this->actingAs($this->user)
                         ->post(route('admins.store'), [
                             'name' => 'New Admin',
                             'email' => 'newadmin@example.com',
                             'password' => 'password',
                         ]);

        $response->assertRedirect(route('admins.index'));
        $this->assertDatabaseHas('admins', ['name' => 'New Admin']);
        $response->assertSessionHas('success');
    }

    public function test_edit_displays_form()
    {
        $admin = Admin::create([
            'name' => 'Test Admin',
            'email' => 'testadmin@example.com',
            'password' => 'password',
        ]);

        $response = $this->actingAs($this->user)
                         ->get(route('admins.edit', $admin));

        $response->assertStatus(200);
        $response->assertViewIs('admins.edit');
        $response->assertViewHas('admin');
    }

    public function test_update_changes_admin()
    {
        $admin = Admin::create([
            'name' => 'Old Admin',
            'email' => 'oldadmin@example.com',
            'password' => 'password',
        ]);

        $response = $this->actingAs($this->user)
                         ->put(route('admins.update', $admin), [
                             'name' => 'Updated Admin',
                             'email' => 'updatedadmin@example.com',
                             'password' => 'newpassword', 
                         ]);

        $response->assertRedirect(route('admins.index'));
        $this->assertDatabaseHas('admins', ['id' => $admin->id, 'name' => 'Updated Admin']);
        $response->assertSessionHas('success');
    }

    public function test_destroy_deletes_admin()
    {
        $admin = Admin::create([
            'name' => 'Test Admin',
            'email' => 'testadmin@example.com',
            'password' => 'password',
        ]);

        $response = $this->actingAs($this->user)
                         ->delete(route('admins.destroy', $admin));

        $response->assertRedirect(route('admins.index'));
        $this->assertDatabaseMissing('admins', ['id' => $admin->id]);
        $response->assertSessionHas('success');
    }
}

