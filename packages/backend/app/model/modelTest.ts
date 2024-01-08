import mongoose from 'mongoose'
// import Comment from './comment.model'

mongoose.connect('mongodb://localhost:27017/acg').then(() => {
  console.log('connect success')
})

const TestSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: {type: Number}
})

const Test = mongoose.model('Test', TestSchema)


async function cr() {
  const response = await Test.create(
    {
      age: 20
    }
  )
  console.log(response)
}


cr()

// const comment = new Comment({
//   content: 'hello world',
//   userId: '655d9aa249fba0d0321f4346',
//   comicId: '64d4e7a7cccc4bf7d491a7e6'
// })

// comment.save().then(() => {
//   console.log('save success')
// })
