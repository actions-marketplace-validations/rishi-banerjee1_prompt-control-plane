# Example Prompts

Try these with PCP to see quality scoring in action:

```bash
# Score a vague prompt (expect low score, high confidence)
pcp score examples/vague-code-change.txt

# Score a well-specified prompt (expect high score, low confidence)
pcp score examples/well-specified-refactor.txt

# Full pre-flight analysis
pcp preflight examples/research-redis-vs-memcached.txt --json

# Check all examples at once
pcp check --file "examples/*.txt"
```

Each file represents a common prompt pattern. See what PCP detects and how it improves them.
