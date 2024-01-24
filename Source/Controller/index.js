
const home = (req,res) => {
    res.status(200).send(
        `<h1>Hello All Everyone</h1>`
    )
}

export default { home }