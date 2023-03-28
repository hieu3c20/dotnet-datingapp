import { UserParams } from './../_models/userParams';
import { PaginatedResult } from './../_models/pagination';
import { map, Observable, of } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../_models/member';
import { AccountService } from './account.service';
import { User } from '../_models/user';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();
  user: User;
  userParam: UserParams;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe().subscribe((user) => {
      this.user = user;
      this.userParam = new UserParams(user);
    });
  }

  getUserParams() {
    return this.userParam;
  }

  setUserParams(params: UserParams) {
    this.userParam = params;
  }

  resetUserParams() {
    this.userParam = new UserParams(this.user);
    return this.userParam;
  }

  getMembers(userParams: UserParams) {
    var response = this.memberCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return getPaginatedResult<Member[]>(
      this.baseUrl + 'users',
      params,
      this.http
    ).pipe(
      map((res) => {
        this.memberCache.set(Object.values(userParams).join('-'), res);
        return res;
      })
    );
  }

  getMember(username: string) {
    // const member = this.members.find((x) => x.username === username);
    // if (member !== undefined) return of(member);
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.username === username);

    if (member) {
      return of(member);
    }

    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

  addLike(username: string) {
    return this.http.post(this.baseUrl + 'likes/' + username, {});
  }

  getLikes(predicate: string, pageNumber, pageSize) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    return getPaginatedResult<Partial<Member[]>>(
      this.baseUrl + 'likes',
      params,
      this.http
    );
  }
}
