const express = require('express');
const bodyParser = require('body-parser');
const body = require("body-parser")
const fs = require('fs');
const path = require("path")
const compiler = require("compilex")
const conn = require('./db');
const options = { stats: true }
const session = require("express-session")
const cookieParser = require("cookie-parser")
compiler.init(options)
let currentman = "";
const app = express();
const port = 8000;
app.use(body.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/codemirror-5.65.16", express.static("codemirror-5.65.16"))
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "secret"
}))

app.set('views', path.join(__dirname, 'views'));

app.get("/", function (req, res) {
    const fpath = path.join(__dirname, 'index.html')
    res.sendFile(fpath)
})

app.get("/signup", function (req, res) {
    compiler.flush(function () {
        console.log("sign up page")
    })
    const filePath = path.join(__dirname, 'signup.html');
    res.sendFile(filePath)

})
app.post("/sighup", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    conn.query("INSERT INTO user (username, password) VALUES (?, ?)", [username, password], (err, result) => {
        if (err) {
            console.error('Error signing up:', err);
            res.status(500).send("Error signing up");
        } else {
            res.redirect('/login');
        }
    });

})

app.get("/login", function (req, res) {
    //debug
    compiler.flush(function () {
        console.log("login page")
    })
    const filePath = path.join(__dirname, 'login.html');
    res.sendFile(filePath)

})


app.post("/login", (req, res) => {
    const { username, password } = req.body;

    conn.query("SELECT * FROM user WHERE username = ? AND password = ?", [username, password], (err, results) => {
        if (err) {
            console.error('Error logging in:', err);
            res.status(500).send("Error logging in");
        } else if (results.length === 0) {
            res.status(401).send("Invalid username or password");
        } else {
            const result = results[0];
            currentman = String(result.user_id);
            console.log(currentman);
            req.session.user = result;
            req.session.save();
            fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
                if (err) {
                    res.status(500).send("Error reading index.html file");
                } else {
                    const updatedHTML = data.replace(`<li style="display: block;"><a href="/login"  >Login/Signup</a></li>`, `<li style="display: none;"><a href="/login"  >Login/Signup</a></li>`);
                    fs.writeFile(path.join(__dirname, 'index.html'), updatedHTML, (err) => {
                        if (err) {
                            console.error('Error writing to problemset.html file:', err);
                            res.status(500).send("Error writing to problemset.html file");
                        } else {

                        }
                    });
                }
            }); res.redirect('/');
        }
    });
});


app.get('/profile', (req, res) => {

    const username = req.session.user.username;
    res.render('profile', { username: username });

});

app.get("/logout", (req, res) => {
    console.log(req.session.user);
    fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send("Error reading index.html file");
        } else {
            const updatedHTML = data.replace(`<li style="display: none;"><a href="/login"  >Login/Signup</a></li>`, `<li style="display: block;"><a href="/login"  >Login/Signup</a></li>`);
            fs.writeFile(path.join(__dirname, 'index.html'), updatedHTML, (err) => {
                if (err) {
                    console.error('Error writing to problemset.html file:', err);
                    res.status(500).send("Error writing to problemset.html file");
                } else {

                }
            });
        }
    });
    req.session.destroy();
    res.redirect('/login')
})
app.get('/submission', (req, res) => {
    const userId = req.session.user.user_id;

    const query = `SELECT submissions.problem, submissions.code, problemset.ptitle, problemset.pstatement  FROM submissions INNER JOIN problemset ON submissions.problem = problemset.pid WHERE submissions.userid = ?`;

    conn.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.render('submissions', { submissions: results });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get("/addproblem", (req, res) => {
    //debug
    compiler.flush(function () {
        console.log("add problem page")
    })
    const filePath = path.join(__dirname, 'addproblem.html');
    res.sendFile(filePath)
})
app.post("/addproblem", (req, res) => {
    const { pid, difficulty, ptitle, pstatement, input1, output1, input2, output2, solution } = req.body;

    const sql = "INSERT INTO problemset (pid, difficulty, ptitle, pstatement, input1, output1, input2, output2, solution) VALUES (?,? , ?, ?, ?, ?, ?, ?, ?)";
    conn.query(sql, [pid, difficulty, ptitle, pstatement, input1, output1, input2, output2, solution], (err, result) => {
        if (err) {
            console.error('Error adding problem to the database:', err);
            res.status(500).send("Error adding problem to the database");
        } else {
            fs.readFile(path.join(__dirname, 'problemset.html'), 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading problemset.html file:', err);
                    res.status(500).send("Error reading problemset.html file");
                } else {
                    const newDiv = `<div data="${pid}"><div data-pid="${pid}">${pid}</div><div data-ptitle="${ptitle}">${ptitle}</div><div data-diff="${difficulty}">${difficulty}</div><div data-sol="sol">solution</div></div>`;
                    const updatedHTML = data.replace('</div></body>', `${newDiv}</div></body>`);
                    fs.writeFile(path.join(__dirname, 'problemset.html'), updatedHTML, (err) => {
                        if (err) {
                            console.error('Error writing to problemset.html file:', err);
                            res.status(500).send("Error writing to problemset.html file");
                        } else {
                            res.redirect('/problemset');
                        }
                    });
                }
            });
        }
    });
});

app.get("/getcourse", (req, res) => {
    const fpath = path.join(__dirname, 'course.html');
    res.sendFile(fpath)
})

app.get('/problemset/:pid', (req, res) => {
    const pid = req.params.pid;

    const sql = "SELECT pid, ptitle, pstatement, input1, output1, input2, output2, solution FROM problemset WHERE pid = ?";
    conn.query(sql, [pid], (err, result) => {
        if (err) {
            console.error('Error retrieving problem data:', err);
            res.status(500).send("Error retrieving problem data");
        } else {
            const problem = result[0]
            res.render('interface', { problem });
        }
    });
});

app.post('/submitcode/:pid', (req, res) => {
    const pid = req.params.pid;
    const { code } = req.body;
    const user = currentman;
    const query = 'INSERT INTO submissions (userid, problem, code) VALUES (?, ?, ?)';
    conn.query(query, [user, pid, code], (error, results, fields) => {
        if (error) {
            console.error('Error executing insert query:', error);
            return;
        }
        console.log('Insert successful');

    });



    res.json({ message: 'Submission successful' });
});

app.get("/problemset", (req, res) => {
    //debug
    compiler.flush(function () {
        console.log("problemset page")
    })
    const filePath = path.join(__dirname, 'problemset.html');
    res.sendFile(filePath)

})
app.post("/compile", function (req, res) {
    var code = req.body.code
    var input = req.body.input
    var lang = req.body.lang
    try {

        if (lang == "Cpp") {
            if (!input) {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPP(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
            else {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
        }
        else if (lang == "Java") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compileJava(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                })
            }
            else {
                //if windows  
                var envData = { OS: "windows" };
                //else
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                })
            }
        }
        else if (lang == "Python") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compilePython(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
            else {
                var envData = { OS: "windows" };
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
        }
    }
    catch (e) {
        console.log("error")
    }
})


app.get('/staticform', (req, res) => {
    res.sendFile(__dirname + '/staticform.html');
});

app.post('/submit', (req, res) => {
    const lanname = req.body.lanname;
    const sectionName = req.body.sectionName;
    const sectionDescription = req.body.sectionDescription;
    const codesection = req.body.codesection;
    console.log(sectionName)
    console.log(sectionDescription)
    console.log(codesection)
    const htmlContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title></title>
        <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
        <link rel="stylesheet" href="../codemirror-5.65.16/lib/codemirror.css">
        <script src="../codemirror-5.65.16/mode/python/python.js"></script>
        <script src="../codemirror-5.65.16/lib/codemirror.js"></script>
        <script src="../codemirror-5.65.16/mode/clike/clike.js"></script>
        <link rel="stylesheet" href="../codemirror-5.65.16/theme/seti.css">
        <script src="../codemirror-5.65.16/addon/edit/closebrackets.js"></script>
    </head>
    <body>
        <div class="container" style=" height: fit-content;">
        <h1 style="font-size: 42px; font-family: Segoe UI,Arial,sans-serif;font-weight: 400;">${sectionName}</h1>
        <div clas="desc" style="height: fit-content; width:fit-content;">${sectionDescription}</div>
        <div class="codesec">
            <h1 style="font-size: 42px; font-family: Segoe UI,Arial,sans-serif;font-weight: 400;">Example</h1>
    
            <textarea type="text" id="editor" class="form-control" aria-label="First name">${codesection}</textarea>
        </div>
        <script>
            var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
                mode: "text/x-c++src",
                theme: "seti",
                lineNumbers: true,
                autoCloseBrackets: true,
        
            })
            var width = window.innerWidth
            editor.setSize(0.7 * width, "300")
           
        </script>
        
    </div>
    </body>
    </html>`
    const fileName = `public/${sectionName}.html`;
    fs.writeFileSync(fileName, htmlContent);

    fs.readFile(path.join(__dirname, `${lanname}.html`), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading problemset.html file:', err);
            res.status(500).send("Error reading problemset.html file");
        } else {
            const newDiv = ` <a href="/${sectionName}.html" target="display">${sectionName}</a>`;
            const updatedHTML = data.replace('<div class="vertical-navbar">', `<div class="vertical-navbar">${newDiv}`);
            fs.writeFile(path.join(__dirname, `${lanname}.html`), updatedHTML, (err) => {
                if (err) {
                    console.error('Error writing to problemset.html file:', err);
                    res.status(500).send("Error writing to problemset.html file");
                } else {

                }
            });
        }
    });


    res.send('File created successfully!');
});

app.get("/python", function (req, res) {
    const fpath = path.join(__dirname, 'python.html');
    res.sendFile(fpath);
})
app.get("/css", function (req, res) {
    const fpath = path.join(__dirname, 'css.html');
    res.sendFile(fpath);
})
app.get("/java", function (req, res) {
    const fpath = path.join(__dirname, 'java.html');
    res.sendFile(fpath);
})
app.get("/javascript", function (req, res) {
    const fpath = path.join(__dirname, 'javascript.html');
    res.sendFile(fpath);
})
app.get("/cpp", function (req, res) {
    const fpath = path.join(__dirname, 'cpp.html');
    res.sendFile(fpath);
})
app.get("/html", function (req, res) {
    const fpath = path.join(__dirname, 'html.html');
    res.sendFile(fpath);
})

// quiz rendering handling
app.get("/quiz", (req, res) => {
    const fpath = path.join(__dirname, 'quiz.html');
    res.sendFile(fpath);
})

app.get("/c_quiz.html", (req, res) => {
    const fpath = path.join(__dirname, 'c_quiz.html');
    res.sendFile(fpath);
})
app.get("/cpp_quiz.html", (req, res) => {
    const fpath = path.join(__dirname, 'cpp_quiz.html');
    res.sendFile(fpath);
})
app.get("/java_quiz.html", (req, res) => {
    const fpath = path.join(__dirname, 'java_quiz.html');
    res.sendFile(fpath);
})
app.get("/python_quiz.html", (req, res) => {
    const fpath = path.join(__dirname, 'python_quiz.html');
    res.sendFile(fpath);
})
app.get("/aboutus", (req, res) => {
    const fpath = path.join(__dirname, 'aboutUs.html');
    res.sendFile(fpath);
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
