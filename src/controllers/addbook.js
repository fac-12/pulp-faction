const queries = require('./queries');

exports.post = (req, res) => {
 console.log(req.body);
  const addBookForm = req.body;
  queries.addbook(addBookForm.title, addBookForm.author, addBookForm.isbn, addBookForm.genre)
  .then((resdata) => {
    console.log(resdata);
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
