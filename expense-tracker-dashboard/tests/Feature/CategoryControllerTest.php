<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoryControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->user = User::factory()->create();
    }

    public function test_index_displays_categories()
    {
        Category::create(['name' => 'Test Category 1']);
        Category::create(['name' => 'Test Category 2']);

        $response = $this->actingAs($this->user)
                         ->get(route('categories.index'));

        $response->assertStatus(200);
        $response->assertViewIs('categories.index');
        $response->assertViewHas('categories');
    }

    public function test_create_displays_form()
    {
        $response = $this->actingAs($this->user)
                         ->get(route('categories.create'));

        $response->assertStatus(200);
        $response->assertViewIs('categories.create');
    }

    public function test_store_creates_new_category()
    {
        $response = $this->actingAs($this->user)
                         ->post(route('categories.store'), [
                             'name' => 'New Test Category',
                         ]);

        $response->assertRedirect(route('categories.index'));
        $this->assertDatabaseHas('categories', ['name' => 'New Test Category']);
        $response->assertSessionHas('success');
    }

    public function test_edit_displays_form()
    {
        $category = Category::create(['name' => 'Test Category']);

        $response = $this->actingAs($this->user)
                         ->get(route('categories.edit', $category));

        $response->assertStatus(200);
        $response->assertViewIs('categories.edit');
        $response->assertViewHas('category');
    }

    public function test_update_changes_category()
    {
        $category = Category::create(['name' => 'Old Name']);

        $response = $this->actingAs($this->user)
                         ->put(route('categories.update', $category), [
                             'name' => 'New Name',
                         ]);

        $response->assertRedirect(route('categories.index'));
        $this->assertDatabaseHas('categories', ['id' => $category->id, 'name' => 'New Name']);
        $response->assertSessionHas('success');
    }

    public function test_destroy_deletes_category()
    {
        $category = Category::create(['name' => 'Test Category']);

        $response = $this->actingAs($this->user)
                         ->delete(route('categories.destroy', $category));

        $response->assertRedirect(route('categories.index'));
        $this->assertDatabaseMissing('categories', ['id' => $category->id]);
        $response->assertSessionHas('success');
    }
}