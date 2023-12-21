<?php
namespace App\Models;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;
    
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
    ];
    
    public function getJWTIdentifier() {
        return $this->getKey();
    }

    public function getJWTCustomClaims() {
        return [];
    }

    public function role()
    {
        return $this->belongsTo(Role::class, "role_id", "id");
    }
    public function employees()
    {
        return $this->belongsToMany(User::class, 'employers_employees', 'employer_id', 'employee_id')
            ->where('role_id', Role::where('role', 'employee')->first()->id);
    }

    public function employer()
    {
        return $this->belongsToMany(User::class, 'employers_employees', 'employee_id', 'employer_id')
            ->where('role_id', Role::where('role', 'employer')->first()->id)->first();
    }

    public function tasks()
    {
        return $this->hasMany(Task::class, 'user_id', 'id');
    }
}