from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # 1. Navigate to the application
            page.goto("http://localhost:3000")

            # 2. Assert that the main title is visible
            expect(page.get_by_role("heading", name="Generador de Dictamen de Prueba VLF")).to_be_visible()

            # 3. Fill out the form
            page.get_by_label("Cliente").fill("Cliente de Prueba S.A.")
            page.get_by_label("Proyecto").fill("Proyecto Torre Centinela")
            page.get_by_label("Distancia del Cable (metros)").fill("1200")
            page.get_by_label("Tipo de Obra").select_option("NUEVA_CONSTRUCCION")

            # 4. Take a screenshot before submitting
            page.screenshot(path="jules-scratch/verification/form_filled.png")

        except Exception as e:
            print(f"An error occurred: {e}")
            page.screenshot(path="jules-scratch/verification/error.png")

        finally:
            browser.close()

if __name__ == "__main__":
    run_verification()
