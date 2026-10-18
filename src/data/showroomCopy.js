const copy = {
  "Amara Three-Seat Sofa":
    "Designed for refined living, this deep-seated silhouette in boucle weave rests on a kiln-dried hardwood base — timeless proportions, inviting comfort.",
  "Wilder Lounge Chair":
    "A curved backrest and tan leather upholstery meet slender brass legs, bringing a quietly confident presence to any corner of the room.",
  "Kessler Platform Bed":
    "Low-profile teak framing and an upholstered headboard combine for a restful, understated centrepiece built around calm proportions.",
  "Bramwell Dining Table":
    "A solid sheesham top with hand-finished edges, generous enough to seat six — a natural gathering point with lasting character.",
  "Solen Coffee Table":
    "Sculpted oak legs carry a smoked-glass surface, pairing warmth and lightness for a refined focal point in the living space.",
  "Marlow Wardrobe":
    "Three considered doors, soft-close hinges and thoughtful inner shelving bring quiet order and elegance to everyday living.",
  "Fenwick Armchair":
    "A wide-arm silhouette dressed in heavyweight linen, offering relaxed comfort with an unmistakably tailored presence.",
  "Cove Dining Chair (Set of 2)":
    "Woven cane backs on a walnut-stained frame bring handcrafted texture and warmth to the dining table, pair after pair.",
};

export function getShowroomCopy(product) {
  return copy[product.name] || product.desc;
}