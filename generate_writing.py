import json
import os

tests_data = [
    {
        "testId": "cambridge-pet-2-test-1-writing",
        "title": "Cambridge B1 Preliminary 2 Writing: Test 1",
        "totalTimeInSeconds": 2700,
        "parts": [
            {
                "id": "writing-part-1",
                "type": "email-writing",
                "title": "Part 1: Write an email",
                "instruction": "Read this email from your English-speaking college classmate Chris and the notes you have made. Write your email to Chris using all the notes (about 100 words).",
                "email": {
                    "from": "Chris",
                    "subject": "Party for Mr Wright",
                    "contentBlocks": [
                        {"text": "Hi everyone", "note": None},
                        {"text": "As you know, our teacher, Mr Wright, is leaving the college after teaching here for 15 years. Because Mr Wright’s such a great teacher, I think we should organise a party for him.", "note": "Good idea!"},
                        {"text": "We can either have the party inside the college or in the park. Which do you think would be better?", "note": "Tell Chris"},
                        {"text": "Shall we all bring some food to the party?", "note": "Yes, because …"},
                        {"text": "It would be nice to give him a really special present. What can we give him?", "note": "Suggest …"},
                        {"text": "Chris", "note": None}
                    ]
                }
            },
            {
                "id": "writing-part-2",
                "type": "story-writing",
                "title": "Part 2: Write a story",
                "instruction": "Your English teacher has asked you to write a story (about 100 words). Your story must begin with this sentence:",
                "promptSentence": "Alex walked out of the airport into the hot sunshine."
            }
        ],
        "filename": "src/data/test5_writing.json"
    },
    {
        "testId": "cambridge-pet-2-test-2-writing",
        "title": "Cambridge B1 Preliminary 2 Writing: Test 2",
        "totalTimeInSeconds": 2700,
        "parts": [
            {
                "id": "writing-part-1",
                "type": "email-writing",
                "title": "Part 1: Write an email",
                "instruction": "Read this email from your English-speaking friend Mo and the notes you have made. Write your email to Mo using all the notes (about 100 words).",
                "email": {
                    "from": "Mo",
                    "subject": "Day out",
                    "contentBlocks": [
                        {"text": "Hi,", "note": None},
                        {"text": "We’ve been very busy recently, so I thought it would be nice to have a day out this weekend.", "note": "Agree"},
                        {"text": "We could go to the beach or spend a day shopping in the city. Which would you prefer?", "note": "Say which"},
                        {"text": "I think it would be nice to invite some other friends to come with us. What do you think?", "note": "Tell Mo"},
                        {"text": "Afterwards, you could come to my house for dinner, if you’re free. Let me know!", "note": "Thanks, but …"},
                        {"text": "Mo", "note": None}
                    ]
                }
            },
            {
                "id": "writing-part-2",
                "type": "story-writing",
                "title": "Part 2: Write a story",
                "instruction": "Your English teacher has asked you to write a story (about 100 words). Your story must begin with this sentence:",
                "promptSentence": "Charlie felt happy as he opened the train door."
            }
        ],
        "filename": "src/data/test6_writing.json"
    },
    {
        "testId": "cambridge-pet-2-test-3-writing",
        "title": "Cambridge B1 Preliminary 2 Writing: Test 3",
        "totalTimeInSeconds": 2700,
        "parts": [
            {
                "id": "writing-part-1",
                "type": "email-writing",
                "title": "Part 1: Write an email",
                "instruction": "Read this email from your English-speaking friend Eden and the notes you have made. Write your email to Eden using all the notes (about 100 words).",
                "email": {
                    "from": "Eden",
                    "subject": "Cycling on Tuesday evening",
                    "contentBlocks": [
                        {"text": "Hi,", "note": None},
                        {"text": "I’m really looking forward to going cycling with you on Tuesday evening. I hope you still want to go!", "note": "Of course!"},
                        {"text": "There are two cycle routes near where I live. We could cycle through the forest or we could cycle round the lake. Which would you prefer?", "note": "Tell Eden"},
                        {"text": "Do you think we should take some food with us?", "note": "No, because …"},
                        {"text": "Do you have time to come to my house and watch a film afterwards? Reply soon!", "note": "Explain"},
                        {"text": "Eden", "note": None}
                    ]
                }
            },
            {
                "id": "writing-part-2",
                "type": "story-writing",
                "title": "Part 2: Write a story",
                "instruction": "Your English teacher has asked you to write a story (about 100 words). Your story must begin with this sentence:",
                "promptSentence": "By the time I arrived, there were already lots of people at the party."
            }
        ],
        "filename": "src/data/test7_writing.json"
    },
    {
        "testId": "cambridge-pet-2-test-4-writing",
        "title": "Cambridge B1 Preliminary 2 Writing: Test 4",
        "totalTimeInSeconds": 2700,
        "parts": [
            {
                "id": "writing-part-1",
                "type": "email-writing",
                "title": "Part 1: Write an email",
                "instruction": "Read this email from your English-speaking friend Jamie and the notes you have made. Write your email to Jamie using all the notes (about 100 words).",
                "email": {
                    "from": "Jamie",
                    "subject": "Your visit",
                    "contentBlocks": [
                        {"text": "Hi,", "note": None},
                        {"text": "I’m so glad you’re coming to visit me next weekend.", "note": "Me too!"},
                        {"text": "The weather will be good and it would be nice to spend a whole day outdoors. We could go horse riding or take a boat trip on the river. What would you like to do?", "note": "Tell Jamie"},
                        {"text": "I’ve invited some friends round for the evening while you’re here. Each of my friends is going to bring something to eat. Could you make a dish too?", "note": "Offer …"},
                        {"text": "Have you got any questions about your visit?", "note": "Ask about transport to Jamie’s house"},
                        {"text": "See you soon!\nJamie", "note": None}
                    ]
                }
            },
            {
                "id": "writing-part-2",
                "type": "story-writing",
                "title": "Part 2: Write a story",
                "instruction": "Your English teacher has asked you to write a story (about 100 words). Your story must begin with this sentence:",
                "promptSentence": "Jan was surprised when her friend gave her a large brown envelope."
            }
        ],
        "filename": "src/data/test8_writing.json"
    }
]

for item in tests_data:
    filename = item.pop("filename")
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(item, f, indent=2, ensure_ascii=False)
    print(f"Created {filename}")

