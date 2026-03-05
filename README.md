# Kai's AGLC Citation Generator

A free, lightweight web tool for generating citations compliant with the **Australian Guide to Legal Citation (4th edition)** (AGLC4). Built with vanilla HTML, CSS and JavaScript — no frameworks, no server required.

This tool is not affiliated with, endorsed by, or associated with The Australian National University, the Melbourne University Law Review Association, or any other institution.

## Features

### Supported Source Types

| Source Type | Format Generated | AGLC4 Rule |
|---|---|---|
| **Domestic Case (Australian)** | *Case Name* (Year) Volume Report Series Starting Page | Rule 2 |
| **International Case** | *Case Name* (Year) Volume Report Series Starting Page (Court/Tribunal) | Rule 2 |
| **Book** | Author, *Title* (Publisher, Edition ed, Year) Pinpoint | Rule 6 |
| **Journal Article** | Author, 'Title' (Year) Volume *Journal Name* Starting Page | Rule 5 |
| **Legislation** | *Title Year* (Jurisdiction) s Section | Rule 3 |
| **Website** | Author, 'Title', *Website Name* (Document Type, Date) \<URL\> | Rule 7.15 |
| **Newspaper Article** | Author, 'Title', *Newspaper* (Place, Date) Page | Rule 7.11 |
| **Conference Paper** | Author, 'Title' (Conference Paper, Forum, Date) | Rule 7.2.4 |
| **Thesis/Dissertation** | Author, 'Title' (Thesis Type, University, Year) | Rule 7.2.5 |
| **Report** | Author, *Title* (Document Type No Number, Date) Pinpoint | Rule 7.1 |
| **Encyclopedia/Dictionary** | *Dictionary Name* (Edition ed, Year) 'Entry' (def Number) | Rule 7.6 |

### Additional Features

- **Pinpoint references** — Add pinpoint page, paragraph or section references for cases, books, journals and legislation
- **Save citations** — Save generated citations to a local list (stored in browser localStorage)
- **Export citations** — Export all saved citations as a `.txt` file
- **Delete individual citations** — Remove specific citations from the saved list
- **Date picker** — Flatpickr-powered date selection for websites, newspapers and conference papers (dd/mm/yyyy format)
- **Privacy-first** — All data stored locally; no data sent to external servers
- **First-load disclaimer** — Users must accept terms before using the tool

## Tech Stack

- **HTML5** — Semantic form structure
- **CSS3** — Custom responsive styling
- **Vanilla JavaScript** — Citation generation, localStorage management, export
- **[Flatpickr](https://flatpickr.js.org/)** — Lightweight date picker
- **Google AdSense** — Non-intrusive ad support

## Usage

1. Open `index.html` in any modern browser
2. Accept the disclaimer on first visit
3. Select a source type from the dropdown
4. Fill in the required fields (marked with *)
5. Click **Generate Citation**
6. Optionally save, export or clear citations

## License

See [LICENSE](LICENSE) for details.
