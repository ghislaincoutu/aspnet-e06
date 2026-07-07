namespace aspnet06.Models;

using System.ComponentModel.DataAnnotations.Schema;

public class Article
{
    public int id { get; set; }
    [Column(TypeName = "varchar(200)")]
    public string title { get; set; }
    [Column(TypeName = "varchar(512)")]
    public string content { get; set; }
    [Column(TypeName = "varchar(100)")]
    public string pubdate { get; set; }
    public Article()
    {
        title = string.Empty;
        content = string.Empty;
        pubdate = string.Empty;
    }
}
