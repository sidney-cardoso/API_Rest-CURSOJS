class HomeController {
  index(req, res) {
    res.status(200).json({ ok: true });
  }
}

export default new HomeController();
