const {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} = require("typeorm");
const Post = require("./post"); 

@Entity()
class Comment {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  name;

  @Column()
  body;

  @Column()
  email;

  @ManyToOne(() => Post, (post) => post.comments)
  post;
}

module.exports = Comment;

// typeorm migration:create -n CreateAutobotsPostsComments
