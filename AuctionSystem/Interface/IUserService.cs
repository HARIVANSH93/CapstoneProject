using AuctionSystem.Data_Transfer_Object;

namespace AuctionSystem.Services
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllAsync();
        Task<LoginResponseDto?> LoginAsync(LoginDto dto);

        Task<UserDto> GetByIdAsync(int id);
        Task<UserDto> RegisterAsync(RegisterUserDto dto);
        
        Task<bool> DeleteAsync(int id);
    }
}
