package dev.javaspring.ecommerce.controller;

import dev.javaspring.ecommerce.model.Produto;
import dev.javaspring.ecommerce.repository.ProdutoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "*")
public class ProdutoController {

    private final ProdutoRepository repository;

    public ProdutoController(ProdutoRepository repository){
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody Produto produto){
        if (repository.existsByNome(produto.getNome())){
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Erro: Já existe um produto cadastrado com esse nome.");
        }else {

            Produto produtoSalvo = repository.save(produto);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(produtoSalvo);
        }
    }
    @GetMapping
    public List<Produto> listarTodos(){
        return repository.findAll();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @DeleteMapping
    public ResponseEntity<Produto> remover(@PathVariable Long id){

        if (!repository.existsById(id)){
            return ResponseEntity
                    .notFound()
                    .build();
        }else{
            repository.deleteById(id);
            return ResponseEntity
                    .noContent()
                    .build();
        }
    }
}