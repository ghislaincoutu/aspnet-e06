using Microsoft.AspNetCore.Mvc;
using aspnet06.Data;
using aspnet06.Models;
using Microsoft.EntityFrameworkCore;

namespace aspnet06.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticlesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ArticlesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _context.Articles.ToListAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var article = await _context.Articles.FindAsync(id);
            return article == null ? NotFound() : Ok(article);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Article article)
        {
            _context.Articles.Add(article);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = article.id }, article);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Article article)
        {
            if (id != article.id) return BadRequest();
            _context.Entry(article).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var article = await _context.Articles.FindAsync(id);
            if (article == null) return NotFound();
            _context.Articles.Remove(article);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("reset")]
        public async Task<IActionResult> ResetArticles()
        {
            await _context.Database.ExecuteSqlRawAsync("CALL reset_database();");
            return Ok(new { message = "Base de données réinitialisée." });
        }
    }
}