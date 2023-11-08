import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepository } from '../../repositories/questions-repository'
import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { NotAllowedError } from '../errors/not-allowed-error'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return failure(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return failure(new NotAllowedError())
    }

    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return success({
      question,
    })
  }
}
