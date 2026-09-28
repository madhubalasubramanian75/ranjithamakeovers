# Simulate CSS Grid with dense packing for 4 columns and 2 columns

def test_grid(spans, cols=4):
    grid = {} # (r, c) -> item_id
    max_r = 0
    for idx, span in enumerate(spans):
        # find first available slot
        placed = False
        r = 0
        while not placed:
            for c in range(cols):
                # check if (r, c) and if span==2, (r+1, c) are free
                if span == 1:
                    if (r, c) not in grid:
                        grid[(r, c)] = idx
                        placed = True
                        max_r = max(max_r, r)
                        break
                elif span == 2:
                    if (r, c) not in grid and (r+1, c) not in grid:
                        grid[(r, c)] = idx
                        grid[(r+1, c)] = idx
                        placed = True
                        max_r = max(max_r, r+1)
                        break
            r += 1
    
    # Check for empty holes inside the grid up to max_r
    holes = []
    for r in range(max_r + 1):
        for c in range(cols):
            if (r, c) not in grid:
                holes.append((r, c))
    return max_r + 1, holes, grid

# Current spans from check_grid_spans
spans_22 = [
    2, 2, 1, 1,
    1, 1, 2, 2,
    1, 1, 1, 1,
    2, 1, 1, 2,
    1, 1,
    2, 2, 2, 2 # 19, 20, 21, 22 all 2!
]

for cols in [4, 2]:
    total_rows, holes, grid = test_grid(spans_22, cols)
    print(f"Cols={cols}: Total rows={total_rows}, Holes={len(holes)}")
    if holes:
        print("  Holes at:", holes)
    else:
        print("  PERFECT! Zero holes!")
