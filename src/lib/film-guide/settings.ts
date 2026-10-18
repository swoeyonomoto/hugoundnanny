export const defaultSettings = {
  "show_price_to_client": true,
  "whatsapp": "4916097813272",
  "email": "hello@hugo-nanny.de",
  "reel_url": "https://pub-389b609f3429428897e0717a18b3a2f0.r2.dev/Hugo%20%26%20Nanny%20Reel%204%2016-9_1.mp4",
  "coverage_one_cam": {
    "one": 5050,
    "two": 6100,
    "three": 8050
  },
  "second_cam_factor": {
    "one": 1.8,
    "two": 1.7,
    "three": 1.6
  },
  "hours": {
    "first": 10,
    "extra": 4
  },
  "prices": {
    "extraHour": {
      "one": 260,
      "two": 420
    },
    "shootLen": {
      "h1": 0,
      "h15": 0,
      "h2": 0
    },
    "shootWhen": {
      "golden": 0,
      "firstlook": 0,
      "both": 0,
      "daybefore": 0,
      "dayafter": 600
    },
    "voices": {
      "interviews": 450,
      "letters": 0,
      "vows": 0,
      "none": 0
    },
    "speechesFilm": 800,
    "photographer": {
      "day": 2500
    },
    "contentCreator": {
      "day": 1200
    },
    "extras": {
      "none": 0,
      "feature": 1150,
      "social": 250,
      "ceremony": 500,
      "super8": 650,
      "vhs": 350,
      "photo": 2450
    }
  },
  "packages": [
    {
      "name": "One eye",
      "from": 5050
    },
    {
      "name": "Two eyes",
      "from": 7550
    },
    {
      "name": "Three eyes",
      "from": 11050
    }
  ]
};
export type GuideSettings = typeof defaultSettings;
export const optionClips: Record<string, { start: number; end: number }> = {
  "style.natural": {
    "start": 45,
    "end": 50
  },
  "style.composed": {
    "start": 41.5,
    "end": 44
  },
  "style.mix": {
    "start": 1,
    "end": 4
  },
  "days.one": {
    "start": 56,
    "end": 60
  },
  "days.two": {
    "start": 9,
    "end": 12.5
  },
  "days.three": {
    "start": 51.5,
    "end": 56
  },
  "crew.one": {
    "start": 15.5,
    "end": 17.5
  },
  "crew.two": {
    "start": 53.5,
    "end": 56
  },
  "shootWhen.golden": {
    "start": 11.5,
    "end": 15
  },
  "shootWhen.firstlook": {
    "start": 17,
    "end": 19.5
  },
  "shootWhen.both": {
    "start": 11.5,
    "end": 19.5
  },
  "shootWhen.daybefore": {
    "start": 5.5,
    "end": 9
  },
  "shootWhen.dayafter": {
    "start": 51.5,
    "end": 54
  },
  "voices.interviews": {
    "start": 35.5,
    "end": 40
  },
  "voices.letters": {
    "start": 47.5,
    "end": 51
  },
  "voices.vows": {
    "start": 9.5,
    "end": 12
  },
  "voices.none": {
    "start": 23.5,
    "end": 29
  },
  "extras.feature": {
    "start": 19.5,
    "end": 24
  },
  "extras.social": {
    "start": 55.5,
    "end": 58
  },
  "extras.ceremony": {
    "start": 33,
    "end": 36
  },
  "extras.super8": {
    "start": 0.5,
    "end": 3.5
  },
  "extras.vhs": {
    "start": 57.5,
    "end": 60
  },
  "extras.photo": {
    "start": 39.5,
    "end": 42
  }
};
