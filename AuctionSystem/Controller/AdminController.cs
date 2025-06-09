using Microsoft.AspNetCore.Mvc;
using AuctionSystem.Data;
using Microsoft.EntityFrameworkCore;

namespace AuctionSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            var totalUsers = await _context.Users.CountAsync();
            var totalAuctions = await _context.Auctions.CountAsync();
            var totalBids = await _context.Bids.CountAsync();
            var totalRevenue = await _context.Transactions.SumAsync(t => (decimal?)t.Amount) ?? 0;

            return Ok(new
            {
                totalUsers,
                totalAuctions,
                totalBids,
                totalRevenue
            });
        }
    }
}
