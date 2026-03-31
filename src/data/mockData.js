export const mockData = {
  id: "pet-reading-practice-1",
  title: "PET B1 Reading Practice Test 01",
  totalTime: 2700, // 45 minutes in seconds
  parts: [
    {
      id: "part-1",
      type: "short-messages",
      title: "Part 1",
      description: "Read the notices and choose the correct answer for each.",
      questions: [
        {
          id: "q1",
          text: "What does the sign say?",
          image: null,
          content: "NO BICYCLES ALLOWED ON THE GRASS",
          options: [
            { id: "A", text: "You can ride your bike if you are careful." },
            { id: "B", text: "Do not use bikes on the grassy area." },
            { id: "C", text: "Parking for bikes is available on the grass." }
          ],
          correctAnswer: "B",
          explanation: "The sign clearly prohibits ('NO') bicycles on the grass."
        },
        {
          id: "q2",
          text: "Hi Sarah, I've left the theatre tickets on the kitchen table. Don't forget to take them. I'll meet you outside the cinema at 7. - Jane",
          options: [
            { id: "A", text: "Jane is meeting Sarah at the kitchen." },
            { id: "B", text: "Sarah should pick up the tickets from the table." },
            { id: "C", text: "Jane will give Sarah the tickets at the cinema." }
          ],
          correctAnswer: "B",
          explanation: "Jane tells Sarah she left the tickets on the kitchen table and not to forget to take them."
        },
        {
          id: "q3",
          text: "OFFER: Buy two pizzas and get a large bottle of cola for free!",
          options: [
            { id: "A", text: "You get a free pizza if you buy cola." },
            { id: "B", text: "You must buy three pizzas to get free cola." },
            { id: "C", text: "Free cola is given with a purchase of two pizzas." }
          ],
          correctAnswer: "C",
          explanation: "The offer explicitly states that buying two pizzas gets you a free bottle of cola."
        },
        {
          id: "q4",
          text: "Library: Please return all books by Friday or pay a fine.",
          options: [
            { id: "A", text: "Books returned after Friday will cost money." },
            { id: "B", text: "The library is closed on Fridays." },
            { id: "C", text: "You cannot return books on Friday." }
          ],
          correctAnswer: "A",
          explanation: "'Pay a fine' means you will have to pay money if you are late."
        },
        {
          id: "q5",
          text: "To: All staff. The lift is broken. Please use the stairs until further notice.",
          options: [
            { id: "A", text: "The lift will be fixed by tomorrow." },
            { id: "B", text: "Staff must not use the lift at the moment." },
            { id: "C", text: "The stairs are also broken." }
          ],
          correctAnswer: "B",
          explanation: "Staff are told to use the stairs because the lift is broken."
        }
      ]
    },
    {
      id: "part-2",
      type: "matching",
      title: "Part 2",
      description: "Match the people with the holiday packages.",
      passage: "People looking for a holiday:\n1. Elena loves history and wants to visit museums.\n2. Mark prefers outdoor activities like hiking.\n3. The Smith family wants a beach holiday with activities for kids.\n4. Sandra wants a quiet place in the countryside to read.\n5. Tom is looking for a city break with great nightlife.",
      questions: [
        {
          id: "q6",
          text: "Elena (History & Museums)",
          options: [
            { id: "A", text: "Mountain Trek: Focus on hiking and nature." },
            { id: "B", text: "City Explorer: Visit ancient ruins and art galleries." },
            { id: "C", text: "Beach Fun: Water sports and kids' club." },
            { id: "D", text: "Country Retreat: A peaceful cottage near a forest." },
            { id: "E", text: "Urban Pulse: Nightclubs and modern shopping malls." }
          ],
          correctAnswer: "B",
          explanation: "Elena wants history and museums, which matches 'ancient ruins and art galleries'."
        },
        {
          id: "q7",
          text: "Mark (Hiking)",
          options: [
            { id: "A", text: "Mountain Trek: Focus on hiking and nature." },
            { id: "B", text: "City Explorer: Visit ancient ruins and art galleries." },
            { id: "C", text: "Beach Fun: Water sports and kids' club." },
            { id: "D", text: "Country Retreat: A peaceful cottage near a forest." },
            { id: "E", text: "Urban Pulse: Nightclubs and modern shopping malls." }
          ],
          correctAnswer: "A",
          explanation: "Mark prefers hiking, which is the focus of 'Mountain Trek'."
        },
        {
          id: "q8",
          text: "The Smith family (Beach & Kids)",
          options: [
            { id: "A", text: "Mountain Trek: Focus on hiking and nature." },
            { id: "B", text: "City Explorer: Visit ancient ruins and art galleries." },
            { id: "C", text: "Beach Fun: Water sports and kids' club." },
            { id: "D", text: "Country Retreat: A peaceful cottage near a forest." },
            { id: "E", text: "Urban Pulse: Nightclubs and modern shopping malls." }
          ],
          correctAnswer: "C",
          explanation: "The Smiths want a beach holiday with kids' activities, matching 'Beach Fun'."
        },
        {
          id: "q9",
          text: "Sandra (Quiet & Reading)",
          options: [
            { id: "A", text: "Mountain Trek: Focus on hiking and nature." },
            { id: "B", text: "City Explorer: Visit ancient ruins and art galleries." },
            { id: "C", text: "Beach Fun: Water sports and kids' club." },
            { id: "D", text: "Country Retreat: A peaceful cottage near a forest." },
            { id: "E", text: "Urban Pulse: Nightclubs and modern shopping malls." }
          ],
          correctAnswer: "D",
          explanation: "Sandra wants a quiet place in the countryside, matching 'Country Retreat'."
        },
        {
          id: "q10",
          text: "Tom (City Break & Nightlife)",
          options: [
            { id: "A", text: "Mountain Trek: Focus on hiking and nature." },
            { id: "B", text: "City Explorer: Visit ancient ruins and art galleries." },
            { id: "C", text: "Beach Fun: Water sports and kids' club." },
            { id: "D", text: "Country Retreat: A peaceful cottage near a forest." },
            { id: "E", text: "Urban Pulse: Nightclubs and modern shopping malls." }
          ],
          correctAnswer: "E",
          explanation: "Tom wants a city break with nightlife, matching 'Urban Pulse'."
        }
      ]
    },
    {
      id: "part-3",
      type: "multiple-choice-passage",
      title: "Part 3",
      description: "Read the article and choose the best answer.",
      passage: "My Life as a Wildlife Photographer by Kevin Mills\n\nI started taking photos when I was ten. My father gave me an old camera, and I spent hours in our garden waiting for birds to land. Now, I travel all over the world to capture images of rare animals. People often ask me if it's dangerous. Sometimes it is, like when I was tracking lions in Africa, but usually, the hardest part is waiting for days in the cold or rain just for one perfect shot.\n\nMany young photographers think they need expensive equipment, but that's not true. You need patience and a good eye for detail. I once used a very basic camera to take a photo of a snow leopard that won a national competition. It's about being in the right place at the right time.",
      questions: [
        {
          id: "q11",
          text: "How did Kevin's interest in photography begin?",
          options: [
            { id: "A", text: "He bought himself a camera." },
            { id: "B", text: "His father introduced him to it." },
            { id: "C", text: "He took a course at school." },
            { id: "D", text: "He saw a professional photographer working." }
          ],
          correctAnswer: "B",
          explanation: "The text says 'My father gave me an old camera'."
        },
        {
          id: "q12",
          text: "What does Kevin say is the most difficult part of his job?",
          options: [
            { id: "A", text: "Dealing with dangerous animals." },
            { id: "B", text: "Traveling to remote places." },
            { id: "C", text: "Waiting for a long time in bad weather." },
            { id: "D", text: "Learning how to use new technology." }
          ],
          correctAnswer: "C",
          explanation: "He states that 'usually, the hardest part is waiting for days in the cold or rain'."
        },
        {
          id: "q13",
          text: "What advice does Kevin give to young photographers?",
          options: [
            { id: "A", text: "Buy the most expensive camera you can afford." },
            { id: "B", text: "Enter as many competitions as possible." },
            { id: "C", text: "Focus on patience and observation." },
            { id: "D", text: "Only photograph animals in your own country." }
          ],
          correctAnswer: "C",
          explanation: "He mentions that you don't need expensive equipment, but 'patience and a good eye for detail'."
        },
        {
          id: "q14",
          text: "What was special about Kevin's award-winning photo of a snow leopard?",
          options: [
            { id: "A", text: "It was taken with a simple camera." },
            { id: "B", text: "It was the first photo he ever took." },
            { id: "C", text: "It took him years to find the animal." },
            { id: "D", text: "He was very close to the leopard." }
          ],
          correctAnswer: "A",
          explanation: "He says he 'used a very basic camera to take a photo of a snow leopard that won a national competition'."
        },
        {
          id: "q15",
          text: "What would be a good title for this text?",
          options: [
            { id: "A", text: "The Dangers of Africa" },
            { id: "B", text: "Why Equipment is Everything" },
            { id: "C", text: "A Passion for Wildlife Photography" },
            { id: "D", text: "How to Win Photo Competitions" }
          ],
          correctAnswer: "C",
          explanation: "The text is an overview of Kevin's career and interest (passion) in wildlife photography."
        }
      ]
    },
    {
      id: "part-4",
      type: "sentence-insertion",
      title: "Part 4",
      description: "Read the text and choose which sentence fits each gap.",
      passage: "Learning a New Language\n\nMany people think that learning a new language is impossible once you are an adult. (16) _____ However, researchers have shown that the brain is still capable of learning complex new skills at any age. (17) _____ It just requires a different approach than children use.\n\nChildren learn by listening and repeating without worrying about rules. (18) _____ They often benefit from understanding the grammar of the language. (19) _____ This helps them see how the language is built. Finally, consistency is key. (20) _____ Even 15 minutes a day can make a huge difference in your progress.",
      questions: [
        {
          id: "q16",
          text: "Gap 16",
          options: [
            { id: "A", text: "They believe that only children can pick up sounds easily." },
            { id: "B", text: "Adults, on the other hand, tend to be more analytical." },
            { id: "C", text: "Learning vocabulary is also very important." },
            { id: "D", text: "You should try to practice every single day." }
          ],
          correctAnswer: "A",
          explanation: "The first sentence mentions people think it's impossible for adults, and 'They' refers back to those people."
        },
        {
          id: "q17",
          text: "Gap 17",
          options: [
            { id: "A", text: "They believe that only children can pick up sounds easily." },
            { id: "B", text: "Adults, on the other hand, tend to be more analytical." },
            { id: "C", text: "Learning vocabulary is also very important." },
            { id: "D", text: "You should try to practice every single day." }
          ],
          correctAnswer: "B",
          explanation: "The text contrasts children's learning with how adults learn."
        },
        {
          id: "q18",
          text: "Gap 18",
          options: [
            { id: "A", text: "They believe that only children can pick up sounds easily." },
            { id: "B", text: "Adults, on the other hand, tend to be more analytical." },
            { id: "C", text: "Learning vocabulary is also very important." },
            { id: "D", text: "You should try to practice every single day." }
          ],
          correctAnswer: "B",
          explanation: "Refers to the analytical nature of adult learners mentioned in the previous paragraph."
        },
        {
          id: "q19",
          text: "Gap 19",
          options: [
            { id: "A", text: "They believe that only children can pick up sounds easily." },
            { id: "B", text: "Adults, on the other hand, tend to be more analytical." },
            { id: "C", text: "Learning vocabulary is also very important." },
            { id: "D", text: "You should try to practice every single day." }
          ],
          correctAnswer: "C",
          explanation: "Adding more ways adults learn after mentioning grammar."
        },
        {
          id: "q20",
          text: "Gap 20",
          options: [
            { id: "A", text: "They believe that only children can pick up sounds easily." },
            { id: "B", text: "Adults, on the other hand, tend to be more analytical." },
            { id: "C", text: "Learning vocabulary is also very important." },
            { id: "D", text: "You should try to practice every single day." }
          ],
          correctAnswer: "D",
          explanation: "'Consistency' matches 'every single day'."
        }
      ]
    },
    {
      id: "part-5",
      type: "multiple-choice-cloze",
      title: "Part 5",
      description: "Choose the correct word to fill in the gaps.",
      passage: "The History of Tea\n\nTea is one of the most popular (21) _____ in the world. It was first (22) _____ in China over 5,000 years ago. According to legend, an emperor was sitting under a tree when some leaves fell into his boiling water. He (23) _____ the taste and the tradition began. Today, tea is (24) _____ in many different ways, from hot tea with milk to iced tea with lemon. It is (25) _____ that millions of cups are drunk every day.",
      questions: [
        {
          id: "q21",
          text: "Gap 21",
          options: [
            { id: "A", text: "drinks" },
            { id: "B", text: "foods" },
            { id: "C", text: "meals" },
            { id: "D", text: "beverages" }
          ],
          correctAnswer: "D",
          explanation: "'Beverages' is the formal word for drinks, common in PET exams."
        },
        {
          id: "q22",
          text: "Gap 22",
          options: [
            { id: "A", text: "discovered" },
            { id: "B", text: "invented" },
            { id: "C", text: "created" },
            { id: "D", text: "found" }
          ],
          correctAnswer: "A",
          explanation: "Tea was naturally occurring, so it was 'discovered', not 'invented'."
        },
        {
          id: "q23",
          text: "Gap 23",
          options: [
            { id: "A", text: "preferred" },
            { id: "B", text: "enjoyed" },
            { id: "C", text: "liked" },
            { id: "D", text: "wanted" }
          ],
          correctAnswer: "B",
          explanation: "'Enjoyed the taste' is a common collocation."
        },
        {
          id: "q24",
          text: "Gap 24",
          options: [
            { id: "A", text: "prepared" },
            { id: "B", text: "made" },
            { id: "C", text: "done" },
            { id: "D", text: "cooked" }
          ],
          correctAnswer: "A",
          explanation: "Tea is 'prepared' in a certain way."
        },
        {
          id: "q25",
          text: "Gap 25",
          options: [
            { id: "A", text: "believed" },
            { id: "B", text: "estimated" },
            { id: "C", text: "known" },
            { id: "D", text: "thought" }
          ],
          correctAnswer: "B",
          explanation: "'Estimated' is used for counting or guessing numbers/quantities."
        }
      ]
    },
    {
      id: "part-6",
      type: "open-cloze",
      title: "Part 6",
      description: "Write one word only to fill each gap.",
      passage: "Dear Tom, I (26) _____ writing to tell you about my trip to London. It was amazing! I went (27) _____ my sister and we saw all the famous sights. The weather was great, (28) _____ it didn't rain at all. We stayed in a small hotel (29) _____ the city center. I took hundreds (30) _____ photos! See you soon, Maria.",
      questions: [
        {
          id: "q26",
          text: "Gap 26",
          correctAnswer: "am",
          explanation: "Present continuous 'I am writing'."
        },
        {
          id: "q27",
          text: "Gap 27",
          correctAnswer: "with",
          explanation: "You go 'with' someone."
        },
        {
          id: "q28",
          text: "Gap 28",
          correctAnswer: "so / and",
          explanation: "Conjunction to connect the clauses."
        },
        {
          id: "q29",
          text: "Gap 29",
          correctAnswer: "in / near",
          explanation: "Preposition of place."
        },
        {
          id: "q30",
          text: "Gap 30",
          correctAnswer: "of",
          explanation: "Collective 'hundreds of'."
        }
      ]
    }
  ]
};
