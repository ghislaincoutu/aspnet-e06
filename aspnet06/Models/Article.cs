namespace aspnet06.Models;

using System.ComponentModel.DataAnnotations.Schema;

public class Article
{
    public int Id { get; set; }
    [Column(TypeName = "varchar(200)")]
    public string Title { get; set; }
    [Column(TypeName = "varchar(200)")]
    public string Content { get; set; }
    [Column(TypeName = "varchar(100)")]
    public string publishedDate { get; set; }
    public Article()
    {
        Title = string.Empty;
        Content = string.Empty;
        publishedDate = string.Empty;
    }
}
