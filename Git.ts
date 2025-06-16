class Commit {
  id: number;
  message: string;
  constructor(id: number, message: string) {
    this.id = id;
    this.message = message;
  }
}

class Git {
  name: string;
  lastCommitId: number;
  HEAD: Commit | null;
  constructor(name: string) {
    this.name = name;
    this.lastCommitId = -1;
    this.HEAD = null;
  }

  commit(message: string) {
    let commit = new Commit(++this.lastCommitId, message);
    this.HEAD = commit;
    return commit;
  }

  log() {
    let history: Commit[] = [];

    return history;
  }
}

let repo = new Git("my-repo");

repo.commit("Make commit work");
