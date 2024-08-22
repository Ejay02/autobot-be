const {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} = require("typeorm");
const Comment = require("./comment"); 
const Autobot = require("./autobot"); 

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  title;

  @Column()
  body;

  @ManyToOne(() => Autobot, (autobot) => autobot.posts)
  autobot;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments;
}

module.exports = Post;
