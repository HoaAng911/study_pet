import test1 from './test1.json';
import test2 from './test2.json';
import test3 from './test3.json';
import test4 from './test4.json';
import test5 from './test5.json';
import test6 from './test6.json';
import test7 from './test7.json';
import test8 from './test8.json';

import test1writing from './test1_writing.json';
import test2writing from './test2_writing.json';
import test3writing from './test3_writing.json';
import test4writing from './test4_writing.json';
import test5writing from './test5_writing.json';
import test6writing from './test6_writing.json';
import test7writing from './test7_writing.json';
import test8writing from './test8_writing.json';

// Sách 2
import sach2test1 from './tests_output/test1_reading.json';
import sach2test2 from './tests_output/test2_reading.json';
import sach2test3 from './tests_output/test3_reading.json';
import sach2test4 from './tests_output/test4_reading.json';
import sach2test5 from './tests_output/test5_reading.json';
import sach2test6 from './tests_output/test6_reading.json';
import sach2test7 from './tests_output/test7_reading.json';
import sach2test8 from './tests_output/test8_reading.json';

export const allTests = {
  // Sách 1 (test1)
  'test1-1': test1,
  'test1-2': test2,
  'test1-3': test3,
  'test1-4': test4,
  'test1-5': test5,
  'test1-6': test6,
  'test1-7': test7,
  'test1-8': test8,

  // Sách 2 (sach2)
  'sach2-1': sach2test1,
  'sach2-2': sach2test2,
  'sach2-3': sach2test3,
  'sach2-4': sach2test4,
  'sach2-5': sach2test5,
  'sach2-6': sach2test6,
  'sach2-7': sach2test7,
  'sach2-8': sach2test8,

  // Writing
  'test-1-writing': test1writing,
  'test-2-writing': test2writing,
  'test-3-writing': test3writing,
  'test-4-writing': test4writing,
  'test-5-writing': test5writing,
  'test-6-writing': test6writing,
  'test-7-writing': test7writing,
  'test-8-writing': test8writing
};

export const testList = [
  {
    category: 'Reading - Sách 1 (test1)',
    tests: [
      { id: 'test1-1', title: 'Sách 1 - Test 1' },
      { id: 'test1-2', title: 'Sách 1 - Test 2' },
      { id: 'test1-3', title: 'Sách 1 - Test 3' },
      { id: 'test1-4', title: 'Sách 1 - Test 4' },
      { id: 'test1-5', title: 'Sách 1 - Test 5' },
      { id: 'test1-6', title: 'Sách 1 - Test 6' },
      { id: 'test1-7', title: 'Sách 1 - Test 7' },
      { id: 'test1-8', title: 'Sách 1 - Test 8' }
    ]
  },
  {
    category: 'Reading - Sách 2 (sach2)',
    tests: [
      { id: 'sach2-1', title: 'Sách 2 - Test 1' },
      { id: 'sach2-2', title: 'Sách 2 - Test 2' },
      { id: 'sach2-3', title: 'Sách 2 - Test 3' },
      { id: 'sach2-4', title: 'Sách 2 - Test 4' },
      { id: 'sach2-5', title: 'Sách 2 - Test 5' },
      { id: 'sach2-6', title: 'Sách 2 - Test 6' },
      { id: 'sach2-7', title: 'Sách 2 - Test 7' },
      { id: 'sach2-8', title: 'Sách 2 - Test 8' }
    ]
  },
  {
    category: 'Writing',
    tests: [
      { id: 'test-1-writing', title: 'PET 1 Writing - Test 1' },
      { id: 'test-2-writing', title: 'PET 1 Writing - Test 2' },
      { id: 'test-3-writing', title: 'PET 1 Writing - Test 3' },
      { id: 'test-4-writing', title: 'PET 1 Writing - Test 4' },
      { id: 'test-5-writing', title: 'PET 2 Writing - Test 1' },
      { id: 'test-6-writing', title: 'PET 2 Writing - Test 2' },
      { id: 'test-7-writing', title: 'PET 2 Writing - Test 3' },
      { id: 'test-8-writing', title: 'PET 2 Writing - Test 4' }
    ]
  }
];
