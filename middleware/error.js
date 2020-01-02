const errorHandler = (err, req, res, next) => {
    // Log to console for dev
    console.log(err.stack.red);

    res.status(500);
}


function errorHandler (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
  }