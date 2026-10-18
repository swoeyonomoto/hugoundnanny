export type LocalizedCopy = Partial<Record<'en' | 'de', string>>;
export interface CopyOption { title?: LocalizedCopy; description?: LocalizedCopy; tag?: LocalizedCopy; hours?: LocalizedCopy; }
export interface CopyQuestion { label: LocalizedCopy; options: Record<string, CopyOption>; placeholder: LocalizedCopy; description: LocalizedCopy; }
export interface ChapterCopy { title: LocalizedCopy; paragraphs: LocalizedCopy[]; points: LocalizedCopy[]; afterList: LocalizedCopy; questions: Record<string, CopyQuestion>; included?: LocalizedCopy[]; note?: LocalizedCopy; }
export const chapterCopy: Record<string, ChapterCopy> = {
  "intro": {
    "title": {
      "en": "Your wedding film. *Explained in five minutes.*",
      "de": "Euer Hochzeitsfilm. *In fünf Minuten erklärt.*"
    },
    "paragraphs": [
      {
        "en": "Before we talk, we want you to know exactly what we do, how it feels and what really matters. A few short chapters - pick what feels right.",
        "de": "Bevor wir sprechen, sollt ihr genau wissen, was wir machen, wie es sich anfühlt und worauf es wirklich ankommt. Ein paar kurze Kapitel - wählt, was sich richtig anfühlt."
      },
      {
        "en": "At the end you have your film plan and a clear estimate. No commitment, no sales call.",
        "de": "Am Ende habt ihr euren Filmplan und eine klare Schätzung. Unverbindlich, kein Verkaufsgespräch."
      }
    ],
    "points": [],
    "afterList": {},
    "questions": {}
  },
  "how": {
    "title": {
      "en": "Hey {names}, *here’s how we like to work.*",
      "de": "Hey {names}, *so arbeiten wir am liebsten.*"
    },
    "paragraphs": [
      {
        "en": "Over the years we fell in love with two- and three-day weddings - and with working as a team of two.",
        "de": "Mit den Jahren haben wir uns in Hochzeiten über zwei oder drei Tage verliebt - und darin, als Team zu zweit zu arbeiten."
      }
    ],
    "points": [
      {
        "en": "**Two days** means more of your story. A welcome evening, a quiet moment the day before - the little things you’ll never want to lose.",
        "de": "**Zwei Tage** heißt: mehr von eurer Geschichte. Ein Welcome-Abend, ein stiller Moment am Vortag - die kleinen Dinge, die ihr nie verlieren wollt."
      },
      {
        "en": "**Two of us** means nothing gets missed. What your best friends say about you, what only the birds can see from above - always recorded, at the same time.",
        "de": "**Wir zu zweit** heißt: nichts geht verloren. Was eure besten Freunde über euch sagen, was nur die Vögel von oben sehen - immer aufgenommen, gleichzeitig."
      }
    ],
    "afterList": {
      "en": "That’s why your plan starts with two days and both of us. Not what you need? No problem - just tell us.",
      "de": "Deshalb startet euer Plan mit zwei Tagen und uns beiden. Nicht das Richtige für euch? Kein Problem - sagt es uns einfach."
    },
    "questions": {
      "start": {
        "label": {
          "en": "What feels right?",
          "de": "Was fühlt sich richtig an?"
        },
        "options": {
          "recommended": {
            "title": {
              "en": "Sounds like us",
              "de": "Klingt nach uns"
            },
            "description": {
              "en": "Two days, both of you. We can still adjust everything.",
              "de": "Zwei Tage, ihr beide. Wir können noch alles anpassen."
            }
          },
          "light": {
            "title": {
              "en": "We need less",
              "de": "Wir brauchen weniger"
            },
            "description": {
              "en": "One day, one of you. A beautiful, focused film.",
              "de": "Ein Tag, eine von euch. Ein schöner, fokussierter Film."
            }
          },
          "later": {
            "title": {
              "en": "Let’s decide later",
              "de": "Entscheiden wir später"
            },
            "description": {
              "en": "Walk us through it step by step.",
              "de": "Zeigt es uns Schritt für Schritt."
            }
          }
        },
        "placeholder": {},
        "description": {}
      }
    }
  },
  "film": {
    "title": {
      "en": "We don’t stage your day. *We follow it.*",
      "de": "Wir inszenieren euren Tag nicht. *Wir folgen ihm.*"
    },
    "paragraphs": [
      {
        "en": "Quiet, close, attentive. No posing, no stiff directions. Just what really happens - turned into a film that feels exactly like the day felt.",
        "de": "Leise, nah, aufmerksam. Keine Posen, keine steifen Anweisungen. Nur was wirklich passiert - als Film, der sich genau so anfühlt wie der Tag."
      },
      {
        "en": "Watch with sound. Then tell us what moved you.",
        "de": "Schaut mit Ton. Und sagt uns dann, was euch berührt hat."
      }
    ],
    "points": [],
    "afterList": {},
    "questions": {
      "loved": {
        "label": {
          "en": "What did you love most?",
          "de": "Was hat euch am meisten berührt?"
        },
        "options": {
          "closeness": {
            "title": {
              "en": "The closeness",
              "de": "Die Nähe"
            }
          },
          "voices": {
            "title": {
              "en": "The voices",
              "de": "Die Stimmen"
            }
          },
          "music": {
            "title": {
              "en": "Music & pacing",
              "de": "Musik & Rhythmus"
            }
          },
          "views": {
            "title": {
              "en": "The wide views",
              "de": "Die Weite"
            }
          },
          "other": {
            "title": {
              "en": "Something else",
              "de": "Etwas anderes"
            }
          }
        },
        "placeholder": {},
        "description": {}
      },
      "lovedNote": {
        "label": {
          "en": "Tell us what it was",
          "de": "Erzählt uns, was es war"
        },
        "options": {},
        "placeholder": {
          "en": "e.g. the moment with the grandparents, the colours, the dancing",
          "de": "z. B. der Moment mit den Großeltern, die Farben, das Tanzen"
        },
        "description": {}
      }
    }
  },
  "style": {
    "title": {
      "en": "How should your film *feel?*",
      "de": "Wie soll sich euer Film *anfühlen?*"
    },
    "paragraphs": [
      {
        "en": "The way a camera moves decides how a film feels. It is the most important creative choice - and the one couples think about least.",
        "de": "Wie sich eine Kamera bewegt, entscheidet, wie sich ein Film anfühlt. Die wichtigste kreative Entscheidung - und die, über die Paare am wenigsten nachdenken."
      }
    ],
    "points": [],
    "afterList": {},
    "questions": {
      "style": {
        "label": {
          "en": "Choose a feel",
          "de": "Wählt ein Gefühl"
        },
        "options": {
          "natural": {
            "title": {
              "en": "Natural & close",
              "de": "Natürlich & nah"
            },
            "description": {
              "en": "Handheld, breathing with you. Our signature feeling: authentic closeness, as if you were standing right there again.",
              "de": "Aus der Hand, atmet mit euch. Unser Signature-Gefühl: echte Nähe, als stündet ihr wieder mittendrin."
            },
            "tag": {
              "en": "Our signature",
              "de": "Unsere Handschrift"
            }
          },
          "composed": {
            "title": {
              "en": "Calm & composed",
              "de": "Ruhig & komponiert"
            },
            "description": {
              "en": "Controlled, static and gliding shots. Gives the film balance, elegance and a sense of authority.",
              "de": "Kontrollierte, ruhige und gleitende Einstellungen. Gibt dem Film Balance, Eleganz und Autorität."
            }
          },
          "mix": {
            "title": {
              "en": "The mix",
              "de": "Die Mischung"
            },
            "description": {
              "en": "Close and alive in the emotional moments, calm and composed for ceremony and places. What most couples choose.",
              "de": "Nah und lebendig in den emotionalen Momenten, ruhig und komponiert bei Trauung und Orten. Das wählen die meisten Paare."
            },
            "tag": {
              "en": "Most chosen",
              "de": "Am häufigsten gewählt"
            }
          }
        },
        "placeholder": {},
        "description": {}
      }
    }
  },
  "days": {
    "title": {
      "en": "One day, or the *whole story?*",
      "de": "Ein Tag, oder die *ganze Geschichte?*"
    },
    "paragraphs": [
      {
        "en": "On day one, people notice the camera. By day two they forget it - that’s when the real moments happen. More days don’t just mean more footage, they give your film an arc: arriving, celebrating, letting go.",
        "de": "Am ersten Tag bemerken die Leute die Kamera. Am zweiten vergessen sie sie - dann passieren die echten Momente. Mehr Tage heißt nicht nur mehr Material, sondern ein Bogen: ankommen, feiern, loslassen."
      },
      {
        "en": "We’ve set you up with two days - what we recommend. Change it if you like, we’ll tell you honestly what changes.",
        "de": "Wir haben euch zwei Tage eingestellt - unsere Empfehlung. Ändert es gern, wir sagen euch ehrlich, was sich dadurch ändert."
      }
    ],
    "points": [],
    "afterList": {},
    "questions": {
      "days": {
        "label": {
          "en": "How many days?",
          "de": "Wie viele Tage?"
        },
        "options": {
          "one": {
            "title": {
              "en": "One day",
              "de": "Ein Tag"
            },
            "hours": {
              "en": "Wedding day · 10 h",
              "de": "Hochzeitstag · 10 Std."
            },
            "description": {
              "en": "The wedding day, from getting ready to the dance floor. A beautiful, complete film.",
              "de": "Der Hochzeitstag, vom Getting Ready bis zur Tanzfläche. Ein schöner, vollständiger Film."
            }
          },
          "two": {
            "title": {
              "en": "Two days",
              "de": "Zwei Tage"
            },
            "hours": {
              "en": "Wedding day 10 h + 1 day · 4 h",
              "de": "Hochzeitstag 10 Std. + 1 Tag · 4 Std."
            },
            "description": {
              "en": "Usually the welcome evening or civil ceremony - but the 4 hours are yours to use however feels right. A couple shoot at the beach, a walk through the city, the night before. Your guests get to know us, you relax, the film gets depth.",
              "de": "Meist der Welcome-Abend oder das Standesamt - aber die 4 Stunden gehören euch, nutzt sie, wie es sich richtig anfühlt. Ein Paarshooting am Strand, ein Spaziergang durch die Stadt, der Abend davor. Eure Gäste lernen uns kennen, ihr entspannt, der Film bekommt Tiefe."
            },
            "tag": {
              "en": "Recommended",
              "de": "Empfohlen"
            }
          },
          "three": {
            "title": {
              "en": "Three days",
              "de": "Drei Tage"
            },
            "hours": {
              "en": "Wedding day 10 h + 2 days · 4 h each",
              "de": "Hochzeitstag 10 Std. + 2 Tage · je 4 Std."
            },
            "description": {
              "en": "Usually day before, wedding, day after - but you shape the two extra 4-hour blocks however feels right. The complete story. Includes your couple shoot on its own day, the long film (about 30 min) and social shorts.",
              "de": "Meist Vortag, Hochzeit, Tag danach - aber die zwei zusätzlichen 4-Stunden-Blöcke gestaltet ihr, wie es sich richtig anfühlt. Die ganze Geschichte. Inklusive Paarshooting an eigenem Tag, langem Film (ca. 30 Min.) und Social Shorts."
            },
            "tag": {
              "en": "Everything included",
              "de": "Alles inklusive"
            }
          }
        },
        "placeholder": {},
        "description": {}
      },
      "daysNote": {
        "label": {
          "en": "Your own plan for the extra days (optional)",
          "de": "Euer eigener Plan für die Zusatztage (optional)"
        },
        "options": {},
        "placeholder": {
          "en": "e.g. couple shoot at the beach on the welcome day, brunch with family on Sunday",
          "de": "z. B. Paarshooting am Strand am Welcome-Tag, Brunch mit der Familie am Sonntag"
        },
        "description": {}
      },
      "extraHours": {
        "label": {
          "en": "Need more time?",
          "de": "Mehr Zeit nötig?"
        },
        "options": {},
        "placeholder": {},
        "description": {
          "en": "Add extra hours wherever you need them - a longer wedding night, a longer welcome evening.",
          "de": "Zusätzliche Stunden, wo ihr sie braucht - eine längere Hochzeitsnacht, ein längerer Welcome-Abend."
        }
      }
    }
  },
  "crew": {
    "title": {
      "en": "Both of us, or *one?*",
      "de": "Wir beide, oder *eine?*"
    },
    "paragraphs": [
      {
        "en": "A second cinematographer isn’t just “more footage”. It changes what is possible:",
        "de": "Eine zweite Kamera ist nicht einfach „mehr Material“. Sie verändert, was möglich ist:"
      }
    ],
    "points": [
      {
        "en": "Drone footage - without missing a single moment on the ground.",
        "de": "Drohnenaufnahmen - ohne einen Moment am Boden zu verpassen."
      },
      {
        "en": "Every speech recorded on a fixed camera, set up perfectly in advance - plus a second angle on the faces listening.",
        "de": "Jede Rede auf einer fest eingerichteten Kamera, perfekt vorbereitet - plus ein zweiter Blick auf die Gesichter der Zuhörenden."
      },
      {
        "en": "Both of you getting ready at the same time, in two places.",
        "de": "Ihr beide beim Getting Ready - gleichzeitig, an zwei Orten."
      },
      {
        "en": "The reaction shot: your face and theirs, in the same second. Priceless.",
        "de": "Der Gegenschuss: euer Gesicht und ihres, in derselben Sekunde. Unbezahlbar."
      }
    ],
    "afterList": {},
    "questions": {
      "crew": {
        "label": {
          "en": "Your crew",
          "de": "Euer Team"
        },
        "options": {
          "one": {
            "title": {
              "en": "One cinematographer",
              "de": "Eine Kamera"
            },
            "description": {
              "en": "One eye, one vision. Intimate and light - ideal for smaller weddings.",
              "de": "Ein Blick, eine Vision. Intim und leicht - ideal für kleinere Hochzeiten."
            }
          },
          "two": {
            "title": {
              "en": "Two cinematographers",
              "de": "Zwei Kameras"
            },
            "description": {
              "en": "Nothing has to be chosen over something else. Recommended from about 60 guests. Price shown for your number of days.",
              "de": "Nichts muss gegen etwas anderes abgewogen werden. Empfohlen ab ca. 60 Gästen. Preis für eure Anzahl an Tagen."
            },
            "tag": {
              "en": "Recommended",
              "de": "Empfohlen"
            }
          }
        },
        "placeholder": {},
        "description": {}
      }
    }
  },
  "shoot": {
    "title": {
      "en": "The couple *shoot.*",
      "de": "Das *Paarshooting.*"
    },
    "paragraphs": [
      {
        "en": "The most intimate images of your film come from here. And it needs time to land: the first twenty minutes you feel the camera - then you forget it.",
        "de": "Die intimsten Bilder eures Films entstehen hier. Und es braucht Zeit: Die ersten zwanzig Minuten spürt ihr die Kamera - dann vergesst ihr sie."
      },
      {
        "en": "That’s why we plan **one hour minimum**. It’s the one thing we never shorten - and the part couples thank us for most.",
        "de": "Deshalb planen wir **mindestens eine Stunde**. Das Einzige, das wir nie kürzen - und der Teil, für den Paare uns am meisten danken."
      }
    ],
    "points": [],
    "afterList": {},
    "questions": {
      "shootLen": {
        "label": {
          "en": "How long?",
          "de": "Wie lange?"
        },
        "options": {
          "h1": {
            "title": {
              "en": "1 hour",
              "de": "1 Stunde"
            }
          },
          "h15": {
            "title": {
              "en": "1.5 hours",
              "de": "1,5 Stunden"
            }
          },
          "h2": {
            "title": {
              "en": "2 hours",
              "de": "2 Stunden"
            }
          }
        },
        "placeholder": {},
        "description": {}
      },
      "shootWhen": {
        "label": {
          "en": "When?",
          "de": "Wann?"
        },
        "options": {
          "golden": {
            "title": {
              "en": "Golden hour, on the day",
              "de": "Goldene Stunde, am Tag"
            },
            "description": {
              "en": "The softest light of the day, usually between dinner courses.",
              "de": "Das weichste Licht des Tages, meist zwischen den Gängen."
            }
          },
          "firstlook": {
            "title": {
              "en": "First look, before the ceremony",
              "de": "First Look, vor der Trauung"
            },
            "description": {
              "en": "You see each other privately first. Emotional, and frees up the afternoon.",
              "de": "Ihr seht euch zuerst allein. Emotional - und der Nachmittag bleibt frei."
            }
          },
          "both": {
            "title": {
              "en": "Golden hour + first look",
              "de": "Goldene Stunde + First Look"
            },
            "description": {
              "en": "The best of both: the first moment you see each other, and the softest light of the day. Your shoot time is split across the two.",
              "de": "Das Beste aus beidem: der erste Moment, in dem ihr euch seht, und das weichste Licht des Tages. Die Shooting-Zeit wird aufgeteilt."
            }
          },
          "daybefore": {
            "title": {
              "en": "The day before, at golden hour",
              "de": "Am Vortag, zur goldenen Stunde"
            },
            "description": {
              "en": "We’re with you anyway - no rush, no wedding-day schedule.",
              "de": "Wir sind sowieso bei euch - ohne Eile, ohne Hochzeitstag-Zeitplan."
            }
          },
          "dayafter": {
            "title": {
              "en": "A separate day",
              "de": "Ein eigener Tag"
            },
            "description": {
              "en": "No schedule, no guests waiting. The most relaxed images you’ll ever have.",
              "de": "Kein Zeitplan, keine wartenden Gäste. Die entspanntesten Bilder, die ihr je haben werdet."
            }
          }
        },
        "placeholder": {},
        "description": {}
      }
    }
  },
  "voices": {
    "title": {
      "en": "The people who *love you.*",
      "de": "Die Menschen, die *euch lieben.*"
    },
    "paragraphs": [
      {
        "en": "Pictures show what happened. Voices tell who you are. We quietly sit down with your loved ones - parents, siblings, best friends - and ask them about you. Their words become the story of your film.",
        "de": "Bilder zeigen, was passiert ist. Stimmen erzählen, wer ihr seid. Wir setzen uns in Ruhe mit euren Liebsten zusammen - Eltern, Geschwister, beste Freunde - und fragen sie nach euch. Ihre Worte werden die Geschichte eures Films."
      }
    ],
    "points": [],
    "afterList": {},
    "questions": {
      "voices": {
        "label": {
          "en": "What should tell your story?",
          "de": "Was soll eure Geschichte erzählen?"
        },
        "options": {
          "interviews": {
            "title": {
              "en": "Interviews with loved ones",
              "de": "Interviews mit euren Liebsten"
            },
            "description": {
              "en": "3-6 people, about five minutes each - on the day or the day before.",
              "de": "3-6 Personen, je ca. fünf Minuten - am Tag oder am Vortag."
            },
            "tag": {
              "en": "Our favourite",
              "de": "Unser Favorit"
            }
          },
          "letters": {
            "title": {
              "en": "Letters to each other",
              "de": "Briefe aneinander"
            },
            "description": {
              "en": "You each write a letter, we record you reading it. The other hears it for the first time in the film.",
              "de": "Ihr schreibt euch je einen Brief, wir nehmen ihn auf. Die andere Person hört ihn zum ersten Mal im Film."
            }
          },
          "vows": {
            "title": {
              "en": "Your vows & speeches",
              "de": "Eure Gelübde & Reden"
            },
            "description": {
              "en": "We build the film around the real words of the day.",
              "de": "Wir bauen den Film um die echten Worte des Tages."
            }
          },
          "none": {
            "title": {
              "en": "Purely visual",
              "de": "Rein visuell"
            },
            "description": {
              "en": "Music only, no spoken words.",
              "de": "Nur Musik, keine gesprochenen Worte."
            }
          }
        },
        "placeholder": {},
        "description": {}
      }
    }
  },
  "speeches": {
    "title": {
      "en": "Speeches are *the heart.*",
      "de": "Reden sind *das Herz.*"
    },
    "paragraphs": [
      {
        "en": "Often the most emotional part of the day - and the hardest to film well. Light, sound and angle have to be set before the first word is spoken. Tell us what to expect so we can plan for it.",
        "de": "Oft der emotionalste Teil des Tages - und der schwierigste, gut zu filmen. Licht, Ton und Perspektive müssen stehen, bevor das erste Wort fällt. Sagt uns, was kommt, damit wir planen können."
      }
    ],
    "points": [],
    "afterList": {},
    "questions": {
      "speechCount": {
        "label": {
          "en": "How many speeches?",
          "de": "Wie viele Reden?"
        },
        "options": {
          "0": {
            "title": {
              "en": "None",
              "de": "Keine"
            }
          },
          "1-2": {
            "title": {
              "en": "1-2",
              "de": "1-2"
            }
          },
          "3-5": {
            "title": {
              "en": "3-5",
              "de": "3-5"
            }
          },
          "6+": {
            "title": {
              "en": "6+",
              "de": "6+"
            }
          }
        },
        "placeholder": {},
        "description": {}
      },
      "speechesFilm": {
        "label": {
          "en": "Keep them forever",
          "de": "Für immer behalten"
        },
        "options": {
          "yes": {
            "title": {
              "en": "Full speeches film",
              "de": "Kompletter Reden-Film"
            },
            "description": {
              "en": "Every speech, complete and uncut, edited from multiple angles. The film you’ll watch with your family in twenty years.",
              "de": "Jede Rede, komplett und ungeschnitten, aus mehreren Perspektiven montiert. Der Film, den ihr in zwanzig Jahren mit eurer Familie schaut."
            }
          }
        },
        "placeholder": {},
        "description": {}
      }
    },
    "note": {
      "en": "With one cinematographer we can’t set up a fixed speech camera and film reactions at the same time. For a speeches film we recommend two.",
      "de": "Mit einer Kamera können wir nicht gleichzeitig eine feste Reden-Kamera einrichten und Reaktionen filmen. Für einen Reden-Film empfehlen wir zwei."
    }
  },
  "extras": {
    "title": {
      "en": "What you *take home.*",
      "de": "Was ihr *mit nach Hause nehmt.*"
    },
    "paragraphs": [
      {
        "en": "Every film includes a 4-5 minute highlight film, drone footage, licensed music and colour grading in our look. Add whatever else feels like you.",
        "de": "Jeder Film enthält einen 4-5-minütigen Highlight-Film, Drohnenaufnahmen, lizenzierte Musik und Colorgrading in unserem Look. Ergänzt, was sich nach euch anfühlt."
      }
    ],
    "points": [],
    "afterList": {},
    "questions": {
      "extras": {
        "label": {
          "en": "Add to your film",
          "de": "Ergänzt euren Film"
        },
        "options": {
          "none": {
            "title": {
              "en": "Just the highlight film",
              "de": "Nur der Highlight-Film"
            },
            "description": {
              "en": "Perfect as it is.",
              "de": "Perfekt so, wie er ist."
            }
          },
          "feature": {
            "title": {
              "en": "Long film, about 30 min",
              "de": "Langer Film, ca. 30 Min."
            },
            "description": {
              "en": "In addition to the highlight film. The whole day told in full - room for the voices, the speeches, the quiet in-between.",
              "de": "Zusätzlich zum Highlight-Film. Der ganze Tag ausführlich erzählt - Raum für Stimmen, Reden und die leisen Momente dazwischen."
            }
          },
          "social": {
            "title": {
              "en": "Social shorts",
              "de": "Social Shorts"
            },
            "description": {
              "en": "Three vertical clips, made for sharing.",
              "de": "Drei vertikale Clips zum Teilen."
            }
          },
          "ceremony": {
            "title": {
              "en": "Full ceremony film",
              "de": "Komplette Trauung"
            },
            "description": {
              "en": "Your ceremony, complete and uncut.",
              "de": "Eure Trauung, komplett und ungeschnitten."
            }
          },
          "super8": {
            "title": {
              "en": "Super 8",
              "de": "Super 8"
            },
            "description": {
              "en": "Real film, real grain. A short nostalgic film shot on analogue.",
              "de": "Echter Film, echtes Korn. Ein kurzer nostalgischer Film, analog gedreht."
            }
          },
          "vhs": {
            "title": {
              "en": "VHS nostalgia film",
              "de": "VHS-Nostalgiefilm"
            },
            "description": {
              "en": "The party, the way your parents’ wedding looked.",
              "de": "Die Party, so wie die Hochzeit eurer Eltern aussah."
            }
          },
          "photo": {
            "title": {
              "en": "Photography too",
              "de": "Auch Fotografie"
            },
            "description": {
              "en": "A photographer from our team - same eye, same feeling.",
              "de": "Eine Fotografin aus unserem Team - gleicher Blick, gleiches Gefühl."
            }
          }
        },
        "placeholder": {},
        "description": {}
      }
    },
    "included": [
      {
        "en": "Highlight film, 4-5 min",
        "de": "Highlight-Film, 4-5 Min."
      },
      {
        "en": "Drone footage",
        "de": "Drohnenaufnahmen"
      },
      {
        "en": "Licensed music & colour grading",
        "de": "Lizenzierte Musik & Colorgrading"
      },
      {
        "en": "Sneak peek within 2 weeks",
        "de": "Sneak Peek innerhalb von 2 Wochen"
      }
    ]
  },
  "about": {
    "title": {
      "en": "And now, *tell us about you.*",
      "de": "Und jetzt, *erzählt uns von euch.*"
    },
    "paragraphs": [
      {
        "en": "So we can check your date and prepare for our first call.",
        "de": "Damit wir euer Datum prüfen und uns auf unser erstes Gespräch vorbereiten können."
      }
    ],
    "points": [],
    "afterList": {},
    "questions": {}
  },
  "plan": {
    "title": {},
    "paragraphs": [],
    "points": [],
    "afterList": {},
    "questions": {}
  }
};
