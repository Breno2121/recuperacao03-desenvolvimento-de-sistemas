import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { libraryService } from "../Services/LibraryService";


export async function LibraryController(app: FastifyInstance) {
  app.post("/library", async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body as CreateBookType;

    await libraryService.create(body)

    return reply.code(201).send();
  });

  app.get("/library", async (request: FastifyRequest, reply: FastifyReply) => {
    const books = await libraryService.getAll()

    return reply.code(200).send(books)
  }
  );

  app.get("/library/:id", async (request: FastifyRequest, reply: FastifyReply) => {
    const params = request.params as { id: string }

    const book = await libraryService.getById(params.id)

    return reply.code(200).send(book)
  }
  );
  
  app.get("/library/isbn/:isbn", async (request: FastifyRequest, reply: FastifyReply) => {
    const params = request.params as { isbn: string }

    const book = await libraryService.getByIsbn(params.isbn)

    return reply.code(200).send(book)
  }
  );

  app.delete("/library/:id", async (request: FastifyRequest, reply: FastifyReply) => {
    const params = request.params as { id: string }

    await libraryService.deleteById(params.id)

    return reply.code(204).send()
  }
  );

  app.patch("/library/:id", async (request: FastifyRequest, reply: FastifyReply) => {
    const params = request.params as { id: string }
    const body = request.body as { title: string }

    await libraryService.updateTitle(params.id, body.title);

    return reply.code(200).send();
  }
  );
}
