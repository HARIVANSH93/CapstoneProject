using AuctionSystem.Data_Transfer_Object;
using AuctionSystem.Services;
using Microsoft.AspNetCore.Mvc;

namespace AuctionSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BidController : ControllerBase
    {
        private readonly IBidService _service;

        public BidController(IBidService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var bids = await _service.GetAllAsync();
            return Ok(bids);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var bid = await _service.GetByIdAsync(id);
            return bid == null ? NotFound() : Ok(bid);
        }

        [HttpPost]
        public async Task<IActionResult> PlaceBid(CreateBidDto dto)
        {
            try
            {
                var result = await _service.PlaceBidAsync(dto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error placing bid", detail = ex.Message });
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteAsync(id);
            return success ? NoContent() : NotFound();
        }
    }
}
