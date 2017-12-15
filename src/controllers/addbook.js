const queries = require('./queries');

exports.post = (req, res) => {
  const addBookForm = req.body;
  queries
  .addBook(addBookForm.Title, addBookForm.Author, addBookForm.Isbn, addBookForm.Genre)
  .then((resdata) => {
    res.status(201).set({Location: '/library' }).send();
  })
  .catch((err) => {
    console.log(err);
  })
}




//
//
// exports.post = (req, res) => {
//   const signupForm = req.body;
//   queries.checkUser(signupForm.gitterhandle)
//     .then((resdata) => {
//
//       const alreadyExists = resdata[0].case;
//
//       return new Promise((resolve, reject) => {
//         if(alreadyExists){
//           reject(new Error('This user already exists, please login'));
//         }else{
//           resolve();
//         }
//       })
