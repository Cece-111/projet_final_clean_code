import { test } from '@japa/runner'
import { CardEntity } from '#cards/domain/card.entity'
import { CategoryNumbers } from '#app/categories/enums/category.numbers'

test.group('Card Entity (Unit)', () => {
  test('should initialize lastAnsweredDate to null on create', ({ assert }) => {
    const card = CardEntity.create('Question', 'Answer', 'Tag')
    const snapshot = card.snapshot()
    
    // @ts-ignore
    assert.isNull(snapshot.lastAnsweredDate)
  })

  test('should restore lastAnsweredDate from persistence', ({ assert }) => {
    const date = new Date('2023-01-01')
    // @ts-ignore
    const card = CardEntity.fromPersistence('id', 'Q', 'A', CategoryNumbers.FIRST, 'Tag', date)
    const snapshot = card.snapshot()
    
    // @ts-ignore
    assert.equal(snapshot.lastAnsweredDate, date)
  })

  test('should update lastAnsweredDate when marked as answered', ({ assert }) => {
    const card = CardEntity.create('Question', 'Answer', 'Tag')
    const date = new Date('2023-12-25')
    
    // @ts-ignore
    card.markAsAnswered(date)
    
    const snapshot = card.snapshot()
    // @ts-ignore
    assert.equal(snapshot.lastAnsweredDate, date)
  })
})
