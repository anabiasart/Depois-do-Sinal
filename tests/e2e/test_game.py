"""Testes reais de navegador; não requer backend do jogo."""
import json
import os
from pathlib import Path
import unittest

from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[2]
KEY = "bellmont_depois_do_sinal_v1"
BROWSER = os.environ.get("BROWSER", "chromium")

class Bellmont(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.pw = sync_playwright().start()
        cls.browser = getattr(cls.pw, BROWSER).launch()

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.pw.stop()

    def setUp(self):
        self.context = self.browser.new_context(
            viewport={"width": 1366, "height": 900}, accept_downloads=True
        )
        self.page = self.context.new_page()
        self.errors = []
        self.page.on("pageerror", lambda error: self.errors.append(str(error)))
        self.page.on("dialog", lambda dialog: dialog.accept())
        self.page.goto(os.environ.get("GAME_URL", "http://127.0.0.1:8000/index.html"))
        expect(self.page.locator('[data-act="new"]')).to_be_visible(timeout=30000)

    def tearDown(self):
        try:
            self.assertEqual(self.errors, [], "Erros JavaScript no navegador")
        finally:
            self.context.close()

    def save(self):
        return self.page.evaluate("(key) => JSON.parse(localStorage.getItem(key))", KEY)

    def action(self, act, id=None):
        selector = f'[data-act="{act}"]'
        if id is not None:
            selector += f'[data-id="{id}"]'
        visible = self.page.locator(selector).filter(visible=True)
        menu = self.page.locator(".entre-full-menu")
        if not visible.count() and menu.count() and not menu.evaluate("(el) => el.open"):
            menu.locator("summary").click()
        return self.page.locator(selector).filter(visible=True).first

    def new_game(self):
        self.action("new").click()
        self.page.locator("#name").fill("Teste Bellmont")
        self.action("creatorStart").click()
        expect(self.page.locator(".shell12")).to_be_visible()
        self.assertEqual(self.save()["name"], "Teste Bellmont")

    def test_new_game_choice_phone_export_import(self):
        self.new_game()
        # Avança até a primeira escolha real, sem pressupor duração da digitação.
        for _ in range(20):
            choice = self.page.locator(".main .choice").first
            if choice.is_visible():
                break
            self.page.locator(".dialog [data-act=next]").click()
        else:
            self.fail("Primeira escolha não encontrada")
        self.page.locator(".main .choice").first.click()
        self.assertEqual(self.save()["flags"]["mabel"], 0)
        self.action("phone").click()
        expect(self.page.locator(".bppanel .bpnav")).to_be_visible()
        self.action("bp90app", "feed").click()
        expect(self.page.locator(".feed13")).to_be_visible()
        self.page.locator("#modal .close").click()
        expect(self.page.locator("#modal .panel")).to_have_count(0)
        self.action("saves").click()
        with self.page.expect_download() as downloaded:
            self.action("export4").click()
        saved_file = downloaded.value.path()
        data = json.loads(saved_file.read_text(encoding="utf-8"))
        self.assertEqual(data["name"], "Teste Bellmont")
        self.page.locator("#import4").set_input_files(str(saved_file))
        expect(self.page.locator("#modal .panel")).to_have_count(0)
        self.assertEqual(self.save()["name"], data["name"])
        self.assertEqual(self.save()["node"], data["node"])

    def test_responsive_narrative(self):
        self.new_game()
        for width, height in [(1920, 1080), (1366, 768), (1024, 768), (768, 1024), (390, 844), (320, 568), (844, 390)]:
            self.page.set_viewport_size({"width": width, "height": height})
            frame = self.page.locator(".entre-stage-frame")
            expect(frame).to_be_visible()
            expect(self.page.locator(".rail12")).to_be_hidden()
            expect(self.page.locator(".entre-icon-rail")).to_be_visible()
            self.assertLessEqual(self.page.evaluate("document.documentElement.scrollWidth"), width + 1)
            dialog = frame.locator(".dialog")
            self.assertEqual(dialog.evaluate("(el) => getComputedStyle(el).overflowY"), "visible")
            self.action("next").scroll_into_view_if_needed()
            expect(self.action("next")).to_be_in_viewport()

    def test_mobile_menu_width(self):
        self.page.set_viewport_size({"width": 320, "height": 568})
        self.new_game()
        self.page.locator(".entre-full-menu summary").click()
        nav = self.page.locator(".entre-full-menu > .nav")
        expect(nav).to_be_visible()
        bounds = nav.bounding_box()
        self.assertGreaterEqual(bounds["width"], 240)
        self.assertGreaterEqual(bounds["x"], 0)
        self.assertLessEqual(bounds["x"] + bounds["width"], 321)
        self.assertTrue(nav.evaluate("(el) => el.scrollWidth <= el.clientWidth + 1"))
        self.action("wardrobe").click()
        expect(self.page.locator("#modal .panel")).to_be_visible()

    def test_legacy_import(self):
        self.action("import14").click()
        self.page.locator("#import4").set_input_files(
            str(ROOT / "tests/fixtures/legacy-minimal.json")
        )
        expect(self.page.locator(".shell12")).to_be_visible()
        data = self.save()
        self.assertEqual(data["name"], "Alex Teste")
        self.assertEqual(data["aff"]["dante"], 7)
        self.assertEqual(data["episode"], 1)

    def test_mobile_phone(self):
        self.page.set_viewport_size({"width": 390, "height": 844})
        self.new_game()
        self.action("phone").click()
        self.action("bp90app", "feed").click()
        panel = self.page.locator(".bppanel")
        expect(panel.locator(".bpnav")).to_be_visible()
        self.assertLessEqual(panel.bounding_box()["width"], 390)
        self.assertEqual(panel.evaluate("(el) => getComputedStyle(el).overflowY"), "hidden")
        self.assertEqual(panel.locator(".bpcontent").evaluate(
            "(el) => getComputedStyle(el).overflowY"), "auto")
        self.page.locator("#modal .close").click()
        expect(panel).to_have_count(0)

if __name__ == "__main__":
    unittest.main(verbosity=2)
