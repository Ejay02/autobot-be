const { Entity, PrimaryGeneratedColumn, Column, OneToMany } = require('typeorm');
const Post = require('./post'); 

@Entity()
class Autobot {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  name;

  @Column({ unique: true })
  username;

  @Column({ unique: true })
  email;

  @Column({ nullable: true })
  address;

  @Column({ nullable: true })
  phone;

  @Column({ nullable: true })
  website;

  @Column({ nullable: true })
  company;

  @OneToMany(() => Post, (post) => post.autobot)
  posts;
}

module.exports = Autobot;