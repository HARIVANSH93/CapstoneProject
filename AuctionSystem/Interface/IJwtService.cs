using AuctionSystem.Models;

namespace AuctionSystem.Services
{
    public interface IJwtService
    {
        string GenerateToken(User user);
    }
}
