import React from 'react'
import BlogCard from '../Component/BlogCard'
import blog from '../assets/blog-photo.jpg'

const LikedBlogs = () => {
    const data=[
        {
            img : blog,
            title : "Lorem ipsum",
            description : "Essay topics in English can be difficult to come up with. While writing essays, many college and high school students face writer’s block and have a hard time to think about topics and ideas for an essay. In this article, we will list out many good essay topics from different categories like argumentative essays, essays on technology, environment essays for students from 5th, 6th, 7th, 8th grades. Following list of essay topics are for all – from kids to college students. We have the largest collection of essays. An essay is nothing but a piece of content which is written from the perception of writer or author. Essays are similar to a story, pamphlet, thesis, etc. The best thing about Essay is you can use any type of language – formal or informal. It can biography, the autobiography of anyone. Following is a great list of 100 essay topics. We will be adding 400 more soon! "
        },
        {
            img : blog,
            title : "ho bhai",
            description : "Essay topics in English can be difficult to come up with. While writing essays, many college and high school students face writer’s block and have a hard time to think about topics and ideas for an essay. In this article, we will list out many good essay topics from different categories like argumentative essays, essays on technology, environment essays for students from 5th, 6th, 7th, 8th grades. Following list of essay topics are for all – from kids to college students. We have the largest collection of essays. An essay is nothing but a piece of content which is written from the perception of writer or author. Essays are similar to a story, pamphlet, thesis, etc. The best thing about Essay is you can use any type of language – formal or informal. It can biography, the autobiography of anyone. Following is a great list of 100 essay topics. We will be adding 400 more soon! "
        },
        {
            img : blog,
            title : "kese",
            description : "Essay topics in English can be difficult to come up with. While writing essays, many college and high school students face writer’s block and have a hard time to think about topics and ideas for an essay. In this article, we will list out many good essay topics from different categories like argumentative essays, essays on technology, environment essays for students from 5th, 6th, 7th, 8th grades. Following list of essay topics are for all – from kids to college students. We have the largest collection of essays. An essay is nothing but a piece of content which is written from the perception of writer or author. Essays are similar to a story, pamphlet, thesis, etc. The best thing about Essay is you can use any type of language – formal or informal. It can biography, the autobiography of anyone. Following is a great list of 100 essay topics. We will be adding 400 more soon! "
        },
        
    ]
  return (
    <div className=''>
     <h1 className='text-2xl font-semibold mb-4 mt-4 underline'>Liked Blogs</h1>
      <div className='flex flex-col gap-4'>
        {data && data.map((item,i)=>(
            <div key={i} className=''>
              <BlogCard item={item}/>
            </div>
        ))}
      </div>

</div>
  )
}

export default LikedBlogs
