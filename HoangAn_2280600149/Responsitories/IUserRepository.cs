using HoangAn_2280600149.Models;
using HoangAn_2280600149.Models.AccountViewModels;
using Microsoft.AspNetCore.Identity;

namespace HoangAn_2280600149.Responsitories
{
    public interface IUserRepository
    {
        Task<IdentityResult> RegisterUserAsync(ApplicationUser identityUser, string password);
        Task AssignRoleAsync(string email, string role);
        Task SignInUserAsync(string email, bool isPersistent);
        Task<SignInResult> PasswordSignInAsync(string email, string password, bool rememberMe);
        Task SignOutAsync();
        Task<List<ApplicationUser>> GetAllUsersAsync();
        Task<ApplicationUser> GetUserByIdAsync(string id);
        Task<IdentityResult> UpdateUserAsync(ApplicationUser user, UserDetailsViewModel model);
        Task<IdentityResult> UpdateUserAsync(ApplicationUser user);
        Task<IdentityResult> DeleteUserAsync(string id);
        Task<ApplicationUser> GetCurrentUserAsync();
        Task<List<UserDetailsViewModel>> GetAllUserDetailsAsync();
        Task<UserDetailsViewModel> GetUserDetailsAsync(string id);
        Task AddUserDetailsAsync(ApplicationUser user, RegisterViewModel model);
        Task<List<string>> GetUserRolesAsync(string userId);
        Task<List<string>> GetAllRolesAsync();
        Task<IdentityResult> UpdateUserRolesAsync(string userId, List<string> roles);
        Task<IdentityResult> RemoveFromRoleAsync(string userId, string role);
    }
}
