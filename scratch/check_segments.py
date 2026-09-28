with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

last_idx = text.rfind('TYPE html>')
start_idx = last_idx - 4  # should be '<!DOC'
doc = text[start_idx:]
print('Starts with:', repr(doc[:50]))
print('Ends with:', repr(doc[-50:]))
print('Length of clean document:', len(doc))
print('Count of </html> in clean doc:', doc.count('</html>'))
print('Count of portfolio in clean doc:', doc.count('portfolio'))
print('Count of services in clean doc:', doc.count('services'))
