import json, unicodedata, re, sys, os

# Read existing IDs and names
with open('/tmp/existing_all.json') as f:
    existing = json.load(f)

existing_ids = set(existing['ids'])
existing_names = set(existing['names'])

def norm(text):
    return unicodedata.normalize('NFD', text.lower()).encode('ascii', 'ignore').decode('utf-8').strip()

norm_existing_names = {norm(n) for n in existing_names}

print(f"Loaded {len(existing_ids)} existing IDs and {len(norm_existing_names)} existing normalized names.")
