class Commit {
  id: number;
  message: string;
  parent: Commit | null;
  constructor(id: number, message: string, parent: Commit | null) {
    this.id = id;
    this.message = message;
    this.parent = parent;
  }
}

class Branch {
  name: string;
  commit: Commit | null;
  constructor(name: string, commit: Commit | null) {
    this.name = name;
    this.commit = commit;
  }
}

class Git {
  name: string;
  lastCommitId: number;
  HEAD: Branch;
  branches: Branch[];
  constructor(name: string) {
    this.name = name;
    this.lastCommitId = -1;
    let master = new Branch("main", null);
    this.HEAD = master;
    this.branches = [master];
  }

  commit(message: string) {
    let commit = new Commit(++this.lastCommitId, message, this.HEAD.commit);
    this.HEAD.commit = commit;
    return commit;
  }

  log() {
    let history: Commit[] = [];
    let commit = this.HEAD.commit;

    while (commit) {
      history.push(commit);
      commit = commit.parent;
    }

    return history;
  }

  checkout(branchName: string) {
    for (let i = this.branches.length; i--; ) {
      if (this.branches[i].name === branchName) {
        console.log("Switched to existing branch: " + branchName);
        this.HEAD = this.branches[i];
        return this;
      }
    }

    let newBranch = new Branch(branchName, this.HEAD.commit);
    this.branches.push(newBranch);
    this.HEAD = newBranch;
    console.log("Switched to new branch: " + branchName);
    return this;
  }
}

let repo = new Git("my-repo");

repo.commit("Make commit work");
