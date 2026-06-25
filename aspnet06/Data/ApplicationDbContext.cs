using Microsoft.EntityFrameworkCore;
using aspnet06.Models;

namespace aspnet06.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<Article> Articles { get; set; }
    }
}